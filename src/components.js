/* Core components */
import CoreFooter from "./components/core/CoreFooter.vue"
import CoreHeader from "./components/core/CoreHeader.vue"
import CoreNotification from "./components/core/CoreNotification.vue"
import CoreNotificationItem from "./components/core/CoreNotificationItem.vue"
import CoreUserMenu from "./components/core/CoreUserMenu.vue"
import CoreUserMenuItem from "./components/core/CoreUserMenuItem.vue"

/* Custom components */
import CustomButton from "./components/custom/CustomButton.vue"
import CustomDropdown from "./components/custom/CustomDropdown.vue"
import CustomLink from "./components/custom/CustomLink.vue"
import CustomForm from "./components/custom/form/CustomForm.vue"
import CustomInput from "./components/custom/form/CustomInput.vue"
import CustomSelect from "./components/custom/form/CustomSelect.vue"
import CustomTabs from "./components/custom/tabs/CustomTabs.vue"
import CustomTab from "./components/custom/tabs/CustomTab.vue"
import CustomTabItems from "./components/custom/tabs/CustomTabItems.vue"
import CustomTabItem from "./components/custom/tabs/CustomTabItem.vue"

/* Icons components */
import IconBurger from "./components/icons/IconBurger.vue"
import IconCheck from "./components/icons/IconCheck.vue"
import IconChevronDown from "./components/icons/IconChevronDown.vue"
import IconCircleFilledPlus from "./components/icons/IconCircleFilledPlus.vue"
import IconCircleOutlineUser from "./components/icons/IconCircleOutlineUser.vue"
import IconFilledCog from "./components/icons/IconFilledCog.vue"
import IconFilledWarning from "./components/icons/IconFilledWarning.vue"
import IconMoon from "./components/icons/IconMoon.vue"
import IconNotFound from "./components/icons/IconNotFound.vue"
import IconOutlinedBell from "./components/icons/IconOutlinedBell.vue"
import IconOutlinedDocument from "./components/icons/IconOutlinedDocument.vue"
import IconOutlinedHelp from "./components/icons/IconOutlinedHelp.vue"
import IconOutlinedLogout from "./components/icons/IconOutlinedLogout.vue"
import IconSun from "./components/icons/IconSun.vue"
import IconWarning from "./components/icons/IconWarning.vue"

/* Page components */
import PageHeader from "./components/page/PageHeader.vue"
import ListItem from "./components/page/list/ListItem.vue"
import ListItemConfirm from "./components/page/list/ListItemConfirm.vue"
import ListItemDetails from "./components/page/list/ListItemDetails.vue"
import ListItems from "./components/page/list/ListItems.vue"
import TabHeader from "./components/page/tab/TabHeader.vue"

const useComponents = (app) => {
	app.component("CoreFooter", CoreFooter)
	app.component("CoreHeader", CoreHeader)
	app.component("CoreNotification", CoreNotification)
	app.component("CoreNotificationItem", CoreNotificationItem)
	app.component("CoreUserMenu", CoreUserMenu)
	app.component("CoreUserMenuItem", CoreUserMenuItem)

	app.component("CustomButton", CustomButton)
	app.component("CustomDropdown", CustomDropdown)
	app.component("CustomLink", CustomLink)
	app.component("CustomForm", CustomForm)
	app.component("CustomInput", CustomInput)
	app.component("CustomSelect", CustomSelect)
	app.component("CustomTabs", CustomTabs)
	app.component("CustomTab", CustomTab)
	app.component("CustomTabItems", CustomTabItems)
	app.component("CustomTabItem", CustomTabItem)

	app.component("IconBurger", IconBurger)
	app.component("IconCheck", IconCheck)
	app.component("IconChevronDown", IconChevronDown)
	app.component("IconCircleFilledPlus", IconCircleFilledPlus)
	app.component("IconCircleOutlineUser", IconCircleOutlineUser)
	app.component("IconFilledCog", IconFilledCog)
	app.component("IconFilledWarning", IconFilledWarning)
	app.component("IconMoon", IconMoon)
	app.component("IconNotFound", IconNotFound)
	app.component("IconOutlinedBell", IconOutlinedBell)
	app.component("IconOutlinedDocument", IconOutlinedDocument)
	app.component("IconOutlinedHelp", IconOutlinedHelp)
	app.component("IconOutlinedLogout", IconOutlinedLogout)
	app.component("IconSun", IconSun)
	app.component("IconWarning", IconWarning)

	app.component("PageHeader", PageHeader)
	app.component("ListItem", ListItem)
	app.component("ListItemConfirm", ListItemConfirm)
	app.component("ListItemDetails", ListItemDetails)
	app.component("ListItems", ListItems)
	app.component("TabHeader", TabHeader)


	return app
}

export {
	useComponents
}