import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/access";
import { organization, user } from "../../../../db/schema";
import { SignUpFormDataSchema } from "@/types/signUp";
import { eq } from "drizzle-orm";
import { hashSync } from "bcrypt";

export async function POST(request: NextRequest) {

    let organizationId: string | undefined;
    let userId: string | undefined;
    try {
        const body = await request.json();
        const validatedBody = SignUpFormDataSchema.parse(body);
        const result1 = await db.insert(organization).values({
            telephone: validatedBody.telephone,
            domain: validatedBody.domain,
            iban: validatedBody.iban,
            accountOwner: validatedBody.accountOwner
        }).returning();

        organizationId = result1[0].id;

        const splittedBirthdate = body.birthDate.split('.');
        const postgresBirthDate = splittedBirthdate[2] + "-" + splittedBirthdate[1] + "-" + splittedBirthdate[0];


        const pw = hashSync(body.password, 10);

        const result2 = await db.insert(user).values({
            email: body.email,
            forname: body.forname,
            surname: body.surname,
            birthdate: postgresBirthDate,
            organization: organizationId,
            password: pw,
            role: 'admin'
        }).returning();

        userId = result2[0].id;

        return NextResponse.json({
            success: true, message: {
                organization: organizationId,
                user: userId
            }
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        if (organizationId) {
            await db.delete(organization).where(eq(organization.id, organizationId)).execute();
        }
        if (userId) {
            await db.delete(user).where(eq(user.id, userId)).execute();
        }
        return NextResponse.json({ error: true }, { status: 400 })
    }
}

