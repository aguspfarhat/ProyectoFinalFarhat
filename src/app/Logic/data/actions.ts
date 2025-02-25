"use server"


// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import { dbConnect } from "../config/db"
// import Users from "../config/models/users";
import Users from "@/models/users";
import { loginFormSchema, userFormSchema } from "./schemas";
import { LoginState, UserState } from "./types";





//ACCION DEL LOGIN
// export const userLoginAction = async (prevState: LoginState, formData: FormData) => {
//     const rawLoginData = Object.fromEntries(formData.entries()); // Extraer info del formulario
//     console.log(rawLoginData);

//     const validatedLoginData = loginFormSchema.safeParse(rawLoginData); // Validar datos del form

//     if (!validatedLoginData.success) {
//         console.log(validatedLoginData.error.flatten().fieldErrors);
//         return {
//             ...prevState,
//             errors: validatedLoginData.error.flatten().fieldErrors,
//             message: "Invalid login credentials. Please check your email and password.",
//         } as LoginState;
//     }

//     const { email, password } = validatedLoginData.data;

//     try {
//         await dbConnect();

//         // Buscar el usuario por email
//         const user = await Users.findOne({ email }).exec();

//         if (!user) {
//             return {
//                 ...prevState,
//                 errors: { email: ["Email not found."] },
//                 message: "Invalid login credentials.",
//             } as LoginState;
//         }

//         // Comparar la contraseña ingresada con la almacenada (hashed)
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return {
//                 ...prevState,
//                 errors: { password: ["Incorrect password."] },
//                 message: "Invalid login credentials.",
//             } as LoginState;
//         }

//         // Login exitoso, puedes usar JWT o cookies para manejar la sesión
//         return {
//             ...prevState,
//             errors: null,
//             message: "Login successful!",
//         } as LoginState;

//     } catch (error) {
//         console.log(error);
//         return {
//             ...prevState,
//             errors: { server: ["An error occurred during login."] },
//             message: "Unable to process your request.",
//         } as LoginState;
//     }
// };

export const userLoginAction = async (prevState: LoginState, formData: FormData) => {
    const rawLoginData = Object.fromEntries(formData.entries()); // Extraer info del formulario
    console.log(rawLoginData);

    const validatedLoginData = loginFormSchema.safeParse(rawLoginData); // Validar datos del form

    if (!validatedLoginData.success) {
        console.log(validatedLoginData.error.flatten().fieldErrors);
        return {
            ...prevState,
            errors: validatedLoginData.error.flatten().fieldErrors,
            message: "Invalid login credentials. Please check your email and password.",
        } as LoginState;
    }

    const { email, password } = validatedLoginData.data;

    try {
        await dbConnect();

        // Buscar el usuario por email
        const user = await Users.findOne({ email }).exec();

        if (!user) {
            return {
                ...prevState,
                errors: { email: ["Email not found."] },
                message: "Invalid login credentials.",
            } as LoginState;
        }

        // Comparar la contraseña ingresada con la almacenada (hashed)
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                ...prevState,
                errors: { password: ["Incorrect password."] },
                message: "Invalid login credentials.",
            } as LoginState;
        }

        // Guardar información relevante en localStorage
        const userData = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(userData));
        }

        // Login exitoso
        return {
            ...prevState,
            errors: null,
            message: "Login successful!",
        } as LoginState;

    } catch (error) {
        console.log(error);
        return {
            ...prevState,
            errors: { server: ["An error occurred during login."] },
            message: "Unable to process your request.",
        } as LoginState;
    }
};


//ACCION DEL SIGNUP

const SALT_ROUNDS = 10;

export const userSignUpFormAction = async (prevState: UserState, formData: FormData) => {
    const rawUserFormData = Object.fromEntries(formData.entries()); //Extraer informacion del form
    console.log(rawUserFormData);

    const validatedUserFormData = userFormSchema.safeParse(rawUserFormData); //Llamar al form-control
    /*
        validatedUserFormData = {
            succes: true o false,
            data: datos validados (name, surname, pass...)
            error: errores
        }
    */

    //Si este valor no es true
    if (!validatedUserFormData.success) {
        console.log(validatedUserFormData.error.flatten().fieldErrors);
        return {
            ...prevState,
            errors: validatedUserFormData.error.flatten().fieldErrors,
            message: "Missing Fields, please submit the required information to create a professional's account."
        } as UserState;
    }

    //Si sigue hasta aca es que la informacion ingresada por el usuario es correcta

    //Hash password encriptar contraseña
    const hashedPass = await bcrypt.hash(validatedUserFormData.data.password, SALT_ROUNDS)
    //Crear el usuario con la contraseña encriptada

    //Sacar el confirmPassword de user
    const { confirmPassword, ...user } = { ...validatedUserFormData.data, password: hashedPass };
    console.log(user);

    try {
        await dbConnect();

        await Users.create({ ...user });

        return {
            ...prevState,
            errors: null,
            message: "Account created succesfully"
        } as UserState;

    } catch (error) {

        console.log(error);
        let errorMessage = "Ups! something went wrong.";

        return {
            ...prevState,
            errors: {
                server: [errorMessage]
            },
            message: errorMessage
        } as UserState;

    }
}








