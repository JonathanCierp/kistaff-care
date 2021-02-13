<template>
	<main class="missions">
		<PageHeader label="Mes missions" />
		<div class="missions__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconFilledCog">A pourvoir</CustomTab>
				<CustomTab icon="IconFilledCog">A venir</CustomTab>
				<CustomTab icon="IconFilledCog">Passées</CustomTab>
				<CustomTab icon="IconFilledCog">Refusées</CustomTab>
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions à pourvoir" />
					<ListItems>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
					</ListItems>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions à venir" />
					<ListItems>
						<ListItem class="list-item-details" >
							<ListItemDetails />
						</ListItem>
						<ListItem class="list-item-details" >
							<ListItemDetails />
						</ListItem>
						<ListItem class="list-item-details" >
							<ListItemDetails />
						</ListItem>
						<ListItem class="list-item-details" >
							<ListItemDetails />
						</ListItem>
					</ListItems>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions passées" />
					<ListItems>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
					</ListItems>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions refusées" />
					<ListItems>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
						<ListItem class="list-item-confirm" >
							<ListItemConfirm />
						</ListItem>
					</ListItems>
				</CustomTabItem>
			</CustomTabItems>
		</div>
	</main>
</template>

<script>
	import { defineComponent, ref } from "vue"
	import PageHeader from "../components/page/PageHeader.vue"
	import CustomTabs from "../components/custom/tabs/CustomTabs.vue"
	import CustomTab from "../components/custom/tabs/CustomTab.vue"
	import CustomTabItems from "../components/custom/tabs/CustomTabItems.vue"
	import CustomTabItem from "../components/custom/tabs/CustomTabItem.vue"
	import TabHeader from "../components/page/tab/TabHeader.vue"
	import ListItems from "../components/page/list/ListItems.vue"
	import ListItem from "../components/page/list/ListItem.vue"
	import ListItemConfirm from "../components/page/list/ListItemConfirm.vue"
	import ListItemDetails from "../components/page/list/ListItemDetails.vue"

	export default defineComponent({
		name: "Home",
		components: {
			PageHeader,
			CustomTabs,
			CustomTab,
			CustomTabItems,
			CustomTabItem,
			TabHeader,
			ListItems,
			ListItem,
			ListItemConfirm,
			ListItemDetails
		},
		setup: () => {
			/* Datas */
			const tab = ref(0)

			return {
				/* Datas */
				tab
			}
		}
	})
</script>