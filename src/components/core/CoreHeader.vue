<template>
	<nav :class="mobileOpenClass" class="core-header">
		<CustomLink to="/" class="core-header__brand">
			<img src="/img/brand-name.png" alt="Kistaff logo plain">
		</CustomLink>
		<ul class="core-header__nav">
			<li v-for="link of links" :key="link.key" :class="[$route.path === link.to ? 'core-header__nav__link--active' : '']"
			    class="core-header__nav__link" @click="onChangeRoute">
				<CustomLink :to="link.to">{{ link.label }}</CustomLink>
			</li>
		</ul>
		<ul class="core-header__side">
			<li>
				<CustomDropdown ref="notificationDropdown" icon>
					<template #title>
						<CustomBadge type="error" inset="10" content="1">
							<IconOutlinedBell />
						</CustomBadge>
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
						<span class="hide-on-mobile">{{ fullName }}</span>
						<span class="hide-on-desktop">{{ fullNameOnMobile }}</span>
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
	import { useStore } from "vuex"

	export default defineComponent({
		name: "CoreHeader.vue",
		setup: () => {
			/* Datas */
			const links = [
				{
					key: "missions",
					to: "/",
					label: "Missions"
				},
				/*{
					key: "offres-d-emplois",
					to: "/offers",
					label: "Offres d'emplois"
				},*/
				{
					key: "etablissements",
					to: "/organizations",
					label: "Etablissements"
				}
			]
			const mobileMenuIsOpen = ref(false)
			const notificationDropdown = ref(null)
			const userDropdown = ref(null)
			const store = useStore()

			/* Methods */
			const toggleMobileMenu = () => {
				mobileMenuIsOpen.value = !mobileMenuIsOpen.value
				document.body.style.overflow = mobileMenuIsOpen.value ? "hidden" : "visible"
				/*const iframe = document.querySelector("body > div > iframe:first-child")
				mobileMenuIsOpen.value ? 
					iframe.style.display = "block" :
					iframe.style.display = "none"*/
			}
			const onChangeRoute = () => {
				notificationDropdown.value.closeDropdown()
				userDropdown.value.closeDropdown()
				mobileMenuIsOpen.value = false
				document.body.style.overflow = "visible"
			}

			/* Computed */
			const mobileOpenClass = computed(() => mobileMenuIsOpen.value ? "core-header--mobile" : "")
			const fullName = computed(() => store.state.user.FirstName + " " + store.state.user.LastName)
			const fullNameOnMobile = computed(() => store.state.user.FirstName?.substr(0, 7) + " ...")

			return {
				/* Datas */
				links,
				notificationDropdown,
				userDropdown,
				store,
				/* Methods */
				toggleMobileMenu,
				onChangeRoute,
				/* Computed */
				mobileOpenClass,
				fullName,
				fullNameOnMobile
			}
		}
	})
</script>
