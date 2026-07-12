import InputError from '@/Components/InputError'
import TextInput from '@/Components/TextInput'
import React from 'react'
import React from 'react'
import { IconLabel } from '../Create'

export default function Create() {
  return (
     <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
                {/* NAME EN */}
                <div>
                    <IconLabel
                        htmlFor="name_en"
                        icon="✈️"
                        text="English Name"
                    />

                    <TextInput
                        id="name_en"
                        value={data.name_en}
                        onChange={(e) =>
                            handleChange("name_en", e.target.value)
                        }
                    />

                    <InputError message={errors.name_en} />
                </div>
  )
}
