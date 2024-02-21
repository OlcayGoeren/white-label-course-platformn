
type Role = 'student' | 'instructor' | 'admin';

type CourseStatus = 'draft' | 'published' | 'closed';

type LectureType = 'video' | 'quiz' | 'text';

type LectureConfig = JSON

interface Invoice {
    id: string;
    amount: number;
    date: Date;
    user: User;
    course: Course;
}

interface PaymentInformation {
    iban: string;
    accountOwner: string;
}

interface Organization {
    id: string;
    paymentInformation: PaymentInformation;
    telephone: string;
    domain: string;
    socialMedia: string;
    companyDomain: string;
}

interface User {
    id: string;
    organization: Organization;
    forname: string;
    surname: string;
    age: number;
    email: string;
    role: Role;
}

interface Instructor extends User {
    gender: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
}

interface Enrollment {
    id: string;
    user: User;
    course: Course;
}

interface Course {
    id: string;
    title: string;
    description: string;
    status: CourseStatus;
    instructor: Instructor;
    questions: JSON,
    price: number;
}

interface Module {
    id: string;
    title: string;
    description: string;
    course: Course;
    order: number;
    status: CourseStatus;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    module: Module;
    order: number;
    status: CourseStatus;
    allowPreview: boolean;
}

interface CourseContent {
    id: string;
    lesson: Lesson;
    order: number;
    lectureType: LectureType;
    lectureConfig: LectureConfig;
}

interface Question {
    id: string;
    text: string;
    lesson: Lesson;
    user: User;
    createdAt: Date;
}

interface Answer {
    id: string;
    text: string;
    question: Question;
    user: User;
    createdAt: Date;
}