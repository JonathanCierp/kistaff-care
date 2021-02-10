<template>
	<nav class="core-header">
		<ul class="core-header__brand">
			<li>Logo</li>
		</ul>
		<ul class="core-header__nav">
			<li>
				<router-link to="/">Missions</router-link>
			</li>
			<li>
				<router-link to="/">Offres d'emplois</router-link>
			</li>
			<li>
				<router-link to="/">Etablissements</router-link>
			</li>
		</ul>
		<ul class="core-header__side">
			<li>
				<CustomDropdown>
					<template #title>
						<IconOutlinedBell />
					</template>
				</CustomDropdown>
			</li>
			<li>
				<IconOutlinedHelp />
			</li>
			<li class="core-header__user">
				John DOE
				<IconChevronDown />
			</li>
		</ul>
	</nav>
</template>

<script>
	import { defineComponent } from "vue"
	import CustomDropdown from "../custom/CustomDropdown.vue"
	import IconOutlinedBell from "../icons/IconOutlinedBell.vue"
	import IconOutlinedHelp from "../icons/IconOutlinedHelp.vue"
	import IconChevronDown from "../icons/IconChevronDown.vue"

	export default defineComponent({
		name: "CoreHeader.vue",
		components: {
			CustomDropdown,
			IconOutlinedBell,
			IconOutlinedHelp,
			IconChevronDown
		},
		setup: () => {

		}
	})
</script>