"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, X } from "lucide-react"

type Notification = {
  id: number
  message: string
  type: "info" | "warning" | "error"
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // useEffect(() => {
  //   // Simulated notifications
  //   const timer = setInterval(() => {
  //     const newNotification: Notification = {
  //       id: Date.now(),
  //       message: "New farm alert!",
  //       type: "info",
  //     }
  //     setNotifications((prev) => [...prev, newNotification])
  //   }, 10000)

  //   return () => clearInterval(timer)
  // }, [])

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`mb-2 p-4 rounded-md shadow-lg ${
              notification.type === "info"
                ? "bg-blue-500"
                : notification.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            } text-white`}
          >
            <div className="flex items-center">
              <AlertCircle className="mr-2" />
              <span>{notification.message}</span>
              <button onClick={() => removeNotification(notification.id)} className="ml-auto">
                <X size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

