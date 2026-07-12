import React from 'react'

export default function IconLabel({ htmlFor, icon, text, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex items-center gap-2 text-sm font-semibold text-gray-700 ${className}`}
    >
      {icon && <span className="text-blue-600">{icon}</span>}
      {text}
    </label>
  )
}
