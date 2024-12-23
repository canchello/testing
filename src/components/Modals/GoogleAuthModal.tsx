// import userStore from "@/stores/userStore";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// export default function GoogleAuthModal() {
//     const { setGoogleAuth, setUser } = userStore();

//     const googleLogin = useGoogleLogin({
//         onSuccess: async (tokenResponse) => {
//             const token = tokenResponse.access_token;
//             try {
//                 const response = await axios.get(
//                     `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
//                 );
//                 const userData = { ...response.data, token }
//                 setUser(userData)
//             } catch (error) {
//                 setUser(null)
//                 console.error('Error fetching user info:', error);
//             } finally {
//                 setGoogleAuth(false)
//             }
//         },
//         onError: (error) => {
//             console.error('Login failed:', error)
//             setUser(null)
//         }
//     });

//     googleLogin();

//     return null;
// }
