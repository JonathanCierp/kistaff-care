<template>
	<div class="custom-date-picker">
		<CustomDropdown ref="notificationDropdown" icon offset="0" placement="top">
			<template #title>
				<CustomInput v-model="dateInput" :label="label" native-type="date" :placeholder="label"
				             width="300px" />
			</template>
			<template #popover>
				<div class="custom-date-picker__container">
					<div class="custom-date-picker__years">
						<div class="custom-date-picker__arrow-left" @click="setMonth(-1)">
							<IconChevronLeft />
						</div>
						<div class="custom-date-picker__years-text">{{ currentMonthYear }}</div>
						<div class="custom-date-picker__arrow-right" @click="setMonth(1)">
							<IconChevronRight />
						</div>
					</div>
					<div class="custom-date-picker__header">
						<div v-for="(day, i) in ['D', 'L', 'M', 'ME', 'J', 'V', 'S']" :key="i"
						     class="custom-date-picker__header__day">
							{{ day }}
						</div>
					</div>
					<div class="custom-date-picker__body">
						<div v-for="(day, i) in getMonthDetails(year, month)/*.filter(d => d._month === 0)*/" :key="i"
						     :class="[
						     		day._month !== 0 ? 'custom-date-picker__body__day--disabled' : '',
						     		isCurrentDay(day) ? 'custom-date-picker__body__day--current' : '',
						     		isSelectedDay(day) ? 'custom-date-picker__body__day--selected' : ''
					        ]" class="custom-date-picker__body__day"
						     @click="onDateClick(day)">
							<span>{{ day.date }}</span>
						</div>
					</div>
				</div>
			</template>
		</CustomDropdown>
	</div>
</template>

<script>
	import { computed, defineComponent, ref } from "vue"

	export default defineComponent({
		name: "CustomDatePicker",
		props: {
			modelValue: {
				type: [String, Number],
				default: ""
			},
			label: {
				type: String,
				default: ""
			}
		},
		setup(props, { emit }) {
			const date = props.modelValue ? new Date(props.modelValue) : new Date()
			const daysMap = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
			const monthMap = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
			const todayTimestamp = ((new Date().getTime() / 1000) + 3600) * 1000
			/* Datas */
			const year = ref(date.getFullYear())
			const month = ref(date.getMonth())
			const selectedDay = ref(null)
			const dateInput = ref(props.modelValue)
			/* Methods */
			const getDayDetails = ({ index, numberOfDays, firstDay, year, month }) => {
				let date = index - firstDay
				let day = index % 7
				let prevMonth = month - 1
				let prevYear = year
				if(prevMonth < 0) {
					prevMonth = 11
					prevYear--
				}
				let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth)
				let _date = (date < 0 ? prevMonthNumberOfDays + date : date % numberOfDays) + 1
				let _month = date < 0 ? -1 : date >= numberOfDays ? 1 : 0
				let monthInt = _month === -1 ? month - 1 : _month === 1 ? month + 1 : month
				let timestamp = new Date(year, monthInt, _date).getTime()

				return { date: _date, day, _month, timestamp, dayString: daysMap[day] }
			}
			const getNumberOfDays = (year, month) => {
				return 40 - new Date(year, month, 40).getDate()
			}
			const getMonthDetails = (year, month) => {
				let firstDay = (new Date(year, month)).getDay()
				let numberOfDays = getNumberOfDays(year, month)
				let monthArray = []
				let rows = 5
				let currentDay = null
				let index = 0
				let cols = 7

				for(let row = 0; row < rows; row++) {
					for(let col = 0; col < cols; col++) {
						currentDay = getDayDetails({ index, numberOfDays, firstDay, year, month })
						monthArray.push(currentDay)
						index++
					}
				}

				return monthArray
			}
			const isCurrentDay = (day) => {
				return getDateStringFromTimestamp(day.timestamp) === getDateStringFromTimestamp(todayTimestamp)
			}
			const isSelectedDay = (day) => {
				return getDateStringFromTimestamp(day.timestamp) === dateInput.value
			}
			const getMonthStr = (month) => {
				return monthMap[Math.max(Math.min(11, month), 0)] || "Month"
			}
			const setMonth = (offset) => {
				let _month = month.value + offset
				if(_month === -1) {
					month.value = 11
					year.value--
				} else if(_month === 12) {
					month.value = 0
					year.value++
				} else {
					month.value = _month
				}
			}
			const getDateStringFromTimestamp = (timestamp) => {
				let dateObject = new Date(timestamp)
				let month = dateObject.getMonth() + 1
				let date = dateObject.getDate()

				return dateObject.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date)
			}
			const onDateClick = (day) => {
				setMonth(day._month)
				selectedDay.value = day.timestamp
				setDateToInput(day.timestamp)
				emit("update:modelValue", dateInput.value)
			}
			const setDateToInput = (timestamp) => {
				dateInput.value = getDateStringFromTimestamp(timestamp)
			}

			/* Computed */
			const currentMonthYear = computed(() => `${getMonthStr(month.value)} ${year.value}`)

			return {
				/* Datas */
				selectedDay,
				year,
				month,
				dateInput,
				/* Methods */
				getDayDetails,
				getNumberOfDays,
				getMonthDetails,
				isCurrentDay,
				isSelectedDay,
				setMonth,
				onDateClick,
				/* Computed */
				currentMonthYear
			}
		}
	})
</script>