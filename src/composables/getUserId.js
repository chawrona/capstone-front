export default function getUserId() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        userId = [...Array(10)]
            .map(() => Math.random().toString(36)[2])
            .join("");
        localStorage.setItem("userId", userId);
    }

    return userId;
}
