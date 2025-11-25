"use client"

import { useState, useRef, useEffect } from "react"
import emailjs from '@emailjs/browser'

export default function ContactForm() {
    const form = useRef<HTMLFormElement>(null)
    const emailErrorRef = useRef<HTMLParagraphElement>(null)
    const emailSuccessRef = useRef<HTMLParagraphElement>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [emailError, setEmailError] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isFormValid, setIsFormValid] = useState(false)

    // Comprehensive email validation function
    const validateEmail = (email: string): { isValid: boolean; error: string } => {
        if (!email) {
            return { isValid: false, error: "Email is required" }
        }

        // Basic email regex pattern
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if (!emailRegex.test(email)) {
            return { isValid: false, error: "Please enter a valid email address" }
        }

        // Check for valid TLD (top-level domain)
        const validTLDs = [
            'com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'io', 'co', 'uk', 'ca', 'au', 
            'de', 'fr', 'jp', 'in', 'br', 'mx', 'ru', 'cn', 'kr', 'it', 'es', 'nl', 'se',
            'no', 'dk', 'fi', 'pl', 'be', 'at', 'ch', 'ie', 'nz', 'za', 'sg', 'hk', 'my',
            'th', 'ph', 'vn', 'id', 'ae', 'sa', 'eg', 'il', 'tr', 'gr', 'pt', 'cz', 'hu',
            'ro', 'bg', 'hr', 'si', 'sk', 'lt', 'lv', 'ee', 'is', 'mt', 'cy', 'lu', 'mc',
            'ad', 'sm', 'va', 'li', 'info', 'biz', 'name', 'pro', 'museum', 'coop', 'aero'
        ]
        
        const domain = email.split('@')[1]
        const tld = domain.split('.').pop()?.toLowerCase()
        
        if (!tld || !validTLDs.includes(tld)) {
            return { isValid: false, error: "Please use a valid email domain" }
        }

        // Check for disposable/temporary email providers
        const disposableProviders = [
            '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
            'yopmail.com', 'throwaway.email', 'temp-mail.org', 'getnada.com',
            'maildrop.cc', 'mohmal.com', 'sharklasers.com', 'guerrillamailblock.com'
        ]
        
        if (disposableProviders.includes(domain.toLowerCase())) {
            return { isValid: false, error: "Please use a permanent email address" }
        }

        return { isValid: true, error: "" }
    }

    // Update form validity whenever fields change
    useEffect(() => {
        const isValid = name.trim() !== "" && email.trim() !== "" && message.trim() !== "" && isEmailValid
        setIsFormValid(isValid)
    }, [name, email, message, isEmailValid])

    // Animate validation messages
    useEffect(() => {
        if (emailErrorRef.current) {
            if (emailError) {
                emailErrorRef.current.classList.add('show')
            } else {
                emailErrorRef.current.classList.remove('show')
            }
        }
        if (emailSuccessRef.current) {
            if (isEmailValid && email) {
                emailSuccessRef.current.classList.add('show')
            } else {
                emailSuccessRef.current.classList.remove('show')
            }
        }
    }, [emailError, isEmailValid, email])

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value
        setEmail(newEmail)
        
        if (newEmail) {
            const validation = validateEmail(newEmail)
            setIsEmailValid(validation.isValid)
            setEmailError(validation.error)
        } else {
            setIsEmailValid(true)
            setEmailError("")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        // Validate all fields
        if (!name.trim() || !email.trim() || !message.trim()) {
            setSubmitStatus("error")
            return
        }

        // Validate email before submitting
        const emailValidation = validateEmail(email)
        if (!emailValidation.isValid) {
            setEmailError(emailValidation.error)
            setIsEmailValid(false)
            setSubmitStatus("error")
            return
        }

        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            // Replace these with your EmailJS credentials
            const result = await emailjs.sendForm(
                'service_coawiqf',     // Replace with your EmailJS service ID
                'template_wr3rgiq',    // Replace with your EmailJS template ID
                form.current!,
                '4xutZolUfG9VCkxzf'      // Replace with your EmailJS public key
            )
            
            console.log('Email sent successfully:', result.text)
            setSubmitStatus("success")
            setName("")
            setEmail("")
            setMessage("")
        } catch (error) {
            console.error('Email sending failed:', error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    } 

    return (
        <section className="max-w-2xl mx-auto font-poppins">
            <h2 className="font-cormorantGaramond text-4xl mb-4 text-center" style={{ color: 'var(--hover-color)' }}>
                Get in Touch
            </h2>
            <p className="text-base leading-relaxed mb-8 text-center" style={{ color: 'var(--secondary-text-color)' }}>
                Have questions about a research paper, want to discuss an idea, or just want to say hello? 
                I&apos;d love to hear from you.
            </p>
            
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label 
                        htmlFor="user_name" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--text-color)' }}
                    >
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-0"
                        style={{
                            backgroundColor: 'var(--bg-color)',
                            borderColor: 'var(--secondary-text-color)',
                            color: 'var(--text-color)'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--hover-color)'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--secondary-text-color)'
                        }}
                        placeholder="Your full name"
                    />
                </div>
                
                <div>
                    <label 
                        htmlFor="user_email" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--text-color)' }}
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-0 ${!isEmailValid && email ? 'input-error' : ''}`}
                        style={{
                            backgroundColor: 'var(--bg-color)',
                            borderColor: !isEmailValid && email ? '#ef4444' : 'var(--secondary-text-color)',
                            color: 'var(--text-color)'
                        }}
                        onFocus={(e) => {
                            if (isEmailValid) {
                                e.target.style.borderColor = 'var(--hover-color)'
                            }
                        }}
                        onBlur={(e) => {
                            if (isEmailValid) {
                                e.target.style.borderColor = 'var(--secondary-text-color)'
                            }
                        }}
                        placeholder="your.email@example.com"
                    />
                    {emailError && (
                        <p 
                            ref={emailErrorRef}
                            className="validation-msg mt-1 text-sm text-red-500"
                        >
                            {emailError}
                        </p>
                    )}
                    {isEmailValid && email && (
                        <p 
                            ref={emailSuccessRef}
                            className="validation-msg mt-1 text-sm" 
                            style={{ color: 'var(--hover-color)' }}
                        >
                            ✓ Valid email address
                        </p>
                    )}
                </div>
                
                <div>
                    <label 
                        htmlFor="message" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--text-color)' }}
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-0 resize-vertical"
                        style={{
                            backgroundColor: 'var(--bg-color)',
                            borderColor: 'var(--secondary-text-color)',
                            color: 'var(--text-color)'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--hover-color)'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--secondary-text-color)'
                        }}
                        placeholder="What's on your mind?"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 ${
                        isSubmitting || !isFormValid ? 'button-disabled' : ''
                    }`}
                    style={{
                        backgroundColor: 'var(--hover-color)',
                        color: 'var(--bg-color)'
                    }}
                >
                {isSubmitting ? "Sending..." : "Send Mail"}
                </button>
                    
                {submitStatus === "success" && (
                    <p className="text-center text-sm" style={{ color: 'var(--hover-color)' }}>
                        Message sent successfully! I&apos;ll get back to you soon.
                    </p>
                )}

                {submitStatus === "error" && (
                    <p className="text-center text-sm text-red-500">
                        {emailError || "Please fill in all fields with valid information."}
                    </p>
                )}
            </form>
        </section>
    )   
}   