import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth)
            .then(() => {
                // Sign-out user success
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.code, error.message);
            });
    };

    return (
        <>
            <header>
                <h1>Notebox</h1>
            </header>
            <main>
                <p>
                    Notebox has been developed for BU students to share lecture notes and
                    it provides easy access to these lecture notes by other students.
                </p>
                <p>Notebox provides you with access to the most recently shared lecture notes.</p>
                <p>
                    You can use the 'Search Course Note' button at the top left to search
                    for course notes. If you do not write lecturer's name, you will have
                    listed all course notes for that course code. You do not need to pay
                    attention to the Turkish characters when writing lecturer' name. The
                    system will ignore misspelled parts automatically.
                </p>
            </main>
            <footer>
                <p>Notebox © 2023</p>
            </footer>
        </>
    );
};

export default Home;
