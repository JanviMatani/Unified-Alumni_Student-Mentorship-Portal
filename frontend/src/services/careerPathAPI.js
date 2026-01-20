const API_URL = "https://unified-alumni-student-mentorship-portal.onrender.com/api/career-paths";

// CLIENT-SIDE FALLBACK DATA
const FALLBACK_PATHS = [
    {
        _id: "client_fb1",
        title: "Frontend Emergency Path (Startup)",
        branch: "CSE", entryLevel: "Beginner", companyType: "Startup",
        avgTime: "1 Year", difficulty: "Easy",
        stages: [
            {
                title: "Learner",
                year: "0-6 Mo",
                salary: "15-25k/mo",
                skills: [
                    {
                        name: "HTML/CSS",
                        weight: 9,
                        topics: ["Semantic HTML", "Flexbox & Grid", "Responsive Design", "Animations", "Accessibility"]
                    },
                    {
                        name: "JavaScript",
                        weight: 10,
                        topics: ["ES6+ Syntax", "DOM Manipulation", "Fetch API", "Async/Await", "Event Loop"]
                    }
                ]
            },
            {
                title: "Junior Dev",
                year: "6-12 Mo",
                salary: "3-6 LPA",
                skills: [
                    {
                        name: "React.js",
                        weight: 9,
                        topics: ["Components & Props", "useState & useEffect", "Custom Hooks", "React Router", "State Management"]
                    },
                    {
                        name: "Tailwind CSS",
                        weight: 8,
                        topics: ["Utility Classes", "Responsive Config", "Dark Mode", "Custom Themes"]
                    }
                ]
            }
        ],
        creatorId: null
    },
    {
        _id: "client_fb2",
        title: "Backend Emergency Path (MNC)",
        branch: "CSE", entryLevel: "Beginner", companyType: "MNC",
        avgTime: "2 Years", difficulty: "Medium",
        stages: [
            {
                title: "Junior Dev",
                year: "1 Year",
                salary: "6-10 LPA",
                skills: [
                    {
                        name: "Java",
                        weight: 8,
                        topics: ["OOPs Concepts", "Collections Framework", "Multithreading", "Exception Handling", "JVM Internals"]
                    },
                    {
                        name: "Databases",
                        weight: 9,
                        topics: ["SQL Queries", "Normalization", "Joins", "Indexing", "ACID Properties"]
                    }
                ]
            },
            {
                title: "SDE-1",
                year: "Year 2",
                salary: "12-18 LPA",
                skills: [
                    {
                        name: "Data Structures",
                        weight: 10,
                        topics: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Dynamic Programming", "Hashing"]
                    },
                    {
                        name: "System Design",
                        weight: 7,
                        topics: ["Load Balancing", "Caching", "Database Sharding", "API Design"]
                    }
                ]
            }
        ],
        creatorId: null
    },
    {
        _id: "client_fb3",
        title: "Full Stack Engineer (Product)",
        branch: "CSE", entryLevel: "Average", companyType: "Product-based",
        avgTime: "3 Years", difficulty: "Hard",
        stages: [
            {
                title: "SDE-2",
                year: "Year 3",
                salary: "20+ LPA",
                skills: [
                    {
                        name: "System Design",
                        weight: 9,
                        topics: ["HLD & LLD", "Scalability", "Caching", "Microservices", "Event Driven Arch"]
                    },
                    {
                        name: "React/Next.js",
                        weight: 9,
                        topics: ["Server Components", "Context API", "SSR/SSG", "Performance Opt", "Vercel Deploy"]
                    }
                ]
            }
        ],
        creatorId: null
    }
];

const filterFallback = (filters) => {
    return FALLBACK_PATHS.filter(p => {
        return (!filters.branch || p.branch === filters.branch) &&
            (!filters.companyType || p.companyType === filters.companyType);
    });
};

export const fetchCareerPaths = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.branch) params.append("branch", filters.branch);
    if (filters.entryLevel) params.append("entryLevel", filters.entryLevel);
    if (filters.companyType) params.append("companyType", filters.companyType);

    try {
        console.log("Fetching from:", `${API_URL}?${params.toString()}`);
        const res = await fetch(`${API_URL}?${params.toString()}`);
        if (!res.ok) throw new Error("Server Error");

        const data = await res.json();
        if (!data || data.length === 0) {
            console.warn("⚠️ Server returned empty. Using Fallback.");
            return filterFallback(filters);
        }
        return data;
    } catch (err) {
        console.error("❌ Network Failed. Serving Client Fallback.", err);
        return filterFallback(filters);
    }
};

export const fetchMyPaths = async (token) => {
    const res = await fetch(`${API_URL}/my-paths`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};

export const createPath = async (token, pathData) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pathData)
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create path");
    }
    return res.json();
};

export const updatePath = async (token, id, pathData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pathData)
    });
    return res.json();
};

export const deletePath = async (token, id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};