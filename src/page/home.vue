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

	export default defineComponent({
		name: "Home",
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