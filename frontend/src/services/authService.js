export const register = async (userData) => {
    const response = await fetch("https://unified-alumni-student-mentorship-portal.onrender.com/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role) localStorage.setItem("role", data.role);
    } else {
        throw new Error(data.message);
    }
    return data;
};

export const login = async (userData) => {
    const response = await fetch("https://unified-alumni-student-mentorship-portal.onrender.com/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role) localStorage.setItem("role", data.role);
    } else {
        throw new Error(data.message);
    }
    return data;
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};