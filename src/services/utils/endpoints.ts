export const endpoints = {
    // Auth Endpoints
    signIn: () => "/auth/sign-in",
    signup:  () => "/auth/sign-up",

    // Tasks Endpoints
    getTasks: () => "/tasks",
    updateTask: (id: string) => `/tasks/${id}`,
    createTask: () => "/tasks"
}