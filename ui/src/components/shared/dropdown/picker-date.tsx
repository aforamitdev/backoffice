import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

function DatePicker({}: Props) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="h-8   gap-2 primary-btn rounded-xs ">
					<CalendarIcon className="h-4 w-4" />
					{selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Due date'}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0 primary-btn rounded-none" align="start">
				<Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus className="bg-zinc-800 text-white rounded-none" />
			</PopoverContent>
		</Popover>
	)
}

export default DatePicker
