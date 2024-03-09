import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/access";
import { organization, user } from "../../../../db/schema";
import { SignUpFormDataSchema } from "@/types/signUp";
import { eq } from "drizzle-orm";
import { hashSync } from "bcrypt";
import { SignUpFormDataSchemaUser, SignUpFormDataSchemaUserType } from "@/types/signupUser";

export async function POST(request: NextRequest) {


    try {
        const body = await request.json();

        const validatedBody = SignUpFormDataSchemaUser.parse(body);

        const organizationFound = await db.query.organization.findFirst({
            where: (organization, { eq }) => eq(organization.domain, validatedBody.domain),
        });

        if (!organizationFound) {
            return NextResponse.json({ error: true }, { status: 400 })
        }

        const splittedBirthdate = validatedBody.birthdate.split('.');
        const postgresBirthDate = splittedBirthdate[2] + "-" + splittedBirthdate[1] + "-" + splittedBirthdate[0];


        console.log(organizationFound)
        const result1 = await db.insert(user).values({
            email: validatedBody.email,
            forname: validatedBody.forname,
            surname: validatedBody.surname,
            birthdate: postgresBirthDate,
            organization: organizationFound.id,
            password: hashSync(validatedBody.password, 10),
        })
        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: true }, { status: 400 })
    }
}

