import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DOCTOR_ROLE, PATIENT_ROLE } from "@/constants/constants";
import { getServerSession } from "next-auth"

type role = typeof PATIENT_ROLE | typeof DOCTOR_ROLE
export const getModifiedServerSession = async (role: role) => {
    const session = await getServerSession(authOptions);

    if (session?.user.role === role) {
        return session;
    }

    return null;

}