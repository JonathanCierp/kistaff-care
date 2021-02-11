<template>
	<nav :class="mobileOpenClass" class="core-header">
		<ul class="core-header__brand">
			<li>Logo</li>
		</ul>
		<ul class="core-header__nav">
			<li v-for="link of links" :key="link.key" :class="[$route.path === link.to ? 'core-header__nav__link--active' : '']"
			    class="core-header__nav__link">
				<CustomLink :to="link.to">{{ link.label }}</CustomLink>
			</li>
		</ul>
		<ul class="core-header__side">
			<li>
				<CustomDropdown ref="notificationDropdown" icon>
					<template #title>
						<IconOutlinedBell />
					</template>
					<template #popover>
						<CoreNotification @change-route="onChangeRoute" />
					</template>
				</CustomDropdown>
			</li>
			<li>
				<a href="https://www.kistaff.fr/s/faq?language=fr" target="_blank">
					<IconOutlinedHelp />
				</a>
			</li>
			<li class="core-header__user">
				<CustomDropdown ref="userDropdown" icon>
					<template #title>
						John DOE
						<IconChevronDown />
					</template>
					<template #popover>
						<CoreUserMenu @change-route="onChangeRoute" />
					</template>
				</CustomDropdown>
			</li>
			<li class="core-header__burger" @click="toggleMobileMenu">
				<CustomButton icon>
					Afficher le menu
				</CustomButton>
			</li>
		</ul>
	</nav>
</template>

<script>
	import { defineComponent, ref, computed } from "vue"
	import CustomLink from "../custom/CustomLink.vue"
	import CoreNotification from "../core/CoreNotification.vue"
	import CoreUserMenu from "../core/CoreUserMenu.vue"
	import CustomDropdown from "../custom/CustomDropdown.vue"
	import CustomButton from "../custom/CustomButton.vue"
	import IconOutlinedBell from "../icons/IconOutlinedBell.vue"
	import IconOutlinedHelp from "../icons/IconOutlinedHelp.vue"
	import IconChevronDown from "../icons/IconChevronDown.vue"

	export default defineComponent({
		name: "CoreHeader.vue",
		components: {
			CustomButton,
			CustomLink,
			CoreNotification,
			CoreUserMenu,
			CustomDropdown,
			IconOutlinedBell,
			IconOutlinedHelp,
			IconChevronDown
		},
		setup: () => {
			/* Datas */
			const links = [
				{
					key: "missions",
					to: "/",
					label: "Missions"
				},
				{
					key: "offres-d-emplois",
					to: "/offers",
					label: "Offres d'emplois"
				},
				{
					key: "etablissements",
					to: "/organizations",
					label: "Etablissements"
				}
			]
			const mobileMenuIsOpen = ref(false)
			const notificationDropdown = ref(null)
			const userDropdown = ref(null)

			/* Methods */
			const toggleMobileMenu = () => {
				mobileMenuIsOpen.value = !mobileMenuIsOpen.value
			}
			
			const onChangeRoute = () => {
				notificationDropdown.value.closeDropdown()
				userDropdown.value.closeDropdown()
			}

			/* Computed */
			const mobileOpenClass = computed(() => mobileMenuIsOpen.value ? "core-header--mobile" : "")

			return {
				/* Datas */
				links,
				notificationDropdown,
				userDropdown,
				/* Methods */
				toggleMobileMenu,
				onChangeRoute,
				/* Computed */
				mobileOpenClass
			}
		}
	})
</script>