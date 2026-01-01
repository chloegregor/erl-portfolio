"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/admin",
        }, {
            onSuccess: () => {
                router.push("/admin")
                router.refresh()
            },
            onError: (ctx) => {
                alert(ctx.error.message || "Une erreur est survenue")
            }
        })
        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <form onSubmit={handleSignUp} className="w-full max-w-md space-y-4 bg-white p-8 border rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Initialiser le compte Artiste</h1>

                <div>
                    <label className="block text-sm font-medium mb-1">Nom complet</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border rounded"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full p-2 border rounded"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Mot de passe</label>
                    <input
                        type="password"
                        required
                        className="w-full p-2 border rounded"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
                >
                    {loading ? "Création..." : "Créer le compte"}
                </button>
            </form>
        </div>
    )
}
