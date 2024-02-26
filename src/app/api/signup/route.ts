import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/access";
import { organization, user } from "../../../../db/schema";
import { SignUpFormDataSchema } from "@/types/signUp";

export async function POST(request: NextRequest) {

    try {
        const body = await request.json();
        const validatedBody = SignUpFormDataSchema.parse(body);

        const result1 = await db.insert(organization).values({
            telephone: validatedBody.telephone,
            domain: validatedBody.domain,
            iban: validatedBody.iban,
            accountOwner: validatedBody.accountOwner
        }).returning();

        const organizationId = result1[0].id;

        const splittedBirthdate = validatedBody.birthDate.split('.');
        const postgresBirthDate = splittedBirthdate[2] + "-" + splittedBirthdate[1] + "-" + splittedBirthdate[0];
        const result2 = await db.insert(user).values({
            email: validatedBody.email,
            forname: validatedBody.forname,
            surname: validatedBody.surname,
            birthdate: postgresBirthDate,
            role: "owner",
            organization: organizationId
        }).returning();

        const userId = result2[0].id;

        return NextResponse.json({
            success: true, message: {
                organization: organizationId,
                user: userId
            }
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 })
    }
}

