/* Modules */
import Datepicker from "vue3-datepicker"

/* Core components */
import CoreFooter from "./components/core/CoreFooter.vue"
import CoreHeader from "./components/core/CoreHeader.vue"
import CoreNotification from "./components/core/CoreNotification.vue"
import CoreNotificationItem from "./components/core/CoreNotificationItem.vue"
import CoreUserMenu from "./components/core/CoreUserMenu.vue"
import CoreUserMenuItem from "./components/core/CoreUserMenuItem.vue"

/* Custom components */
import CustomButton from "./components/custom/CustomButton.vue"
import CustomBadge from "./components/custom/CustomBadge.vue"
import CustomDialog from "./components/custom/dialog/CustomDialog.vue"
import CustomDialogActions from "./components/custom/dialog/CustomDialogActions.vue"
import CustomDialogBody from "./components/custom/dialog/CustomDialogBody.vue"
import CustomDialogTitle from "./components/custom/dialog/CustomDialogTitle.vue"
import CustomDropdown from "./components/custom/CustomDropdown.vue"
import CustomLink from "./components/custom/CustomLink.vue"
import CustomProgressCircle from "./components/custom/CustomProgressCircle.vue"
import CustomDatePicker from "./components/custom/form/CustomDatePicker.vue"
import CustomFileUpload from "./components/custom/form/CustomFileUpload.vue"
import CustomForm from "./components/custom/form/CustomForm.vue"
import CustomInput from "./components/custom/form/CustomInput.vue"
import CustomSelect from "./components/custom/form/CustomSelect.vue"
import CustomRadio from "./components/custom/form/CustomRadio.vue"
import CustomCheckbox from "./components/custom/form/CustomCheckbox.vue"
import CustomRow from "./components/custom/layout/CustomRow.vue"
import CustomTabs from "./components/custom/tabs/CustomTabs.vue"
import CustomTab from "./components/custom/tabs/CustomTab.vue"
import CustomTabItems from "./components/custom/tabs/CustomTabItems.vue"
import CustomTabItem from "./components/custom/tabs/CustomTabItem.vue"
import CustomTransition from "./components/custom/CustomTransition.vue"
import CustomEntriesNotFound from "./components/custom/CustomEntriesNotFound.vue"

/* Dialog components */
import AcceptMissionDialog from "./components/dialog/AcceptMissionDialog.vue"
import RefuseMissionDialog from "./components/dialog/RefuseMissionDialog.vue"
import UploadDocumentDialog from "./components/dialog/UploadDocumentDialog.vue"
import DeleteDocumentDialog from "./components/dialog/DeleteDocumentDialog.vue"
import ResetPasswordDialog from "./components/dialog/ResetPasswordDialog.vue"

/* Icons components */
import IconBurger from "./components/icons/IconBurger.vue"
import IconCheck from "./components/icons/IconCheck.vue"
import IconChevronDown from "./components/icons/IconChevronDown.vue"
import IconChevronLeft from "./components/icons/IconChevronLeft.vue"
import IconChevronRight from "./components/icons/IconChevronRight.vue"
import IconCircleFilledCheck from "./components/icons/IconCircleFilledCheck.vue"
import IconCircleFilledClose from "./components/icons/IconCircleFilledClose.vue"
import IconCircleFilledInfo from "./components/icons/IconCircleFilledInfo.vue"
import IconCircleFilledPlus from "./components/icons/IconCircleFilledPlus.vue"
import IconCircleFilledWarning from "./components/icons/IconCircleFilledWarning.vue"
import IconCircleOutlineUser from "./components/icons/IconCircleOutlineUser.vue"
import IconClose from "./components/icons/IconClose.vue"
import IconFilledCog from "./components/icons/IconFilledCog.vue"
import IconFilledWarning from "./components/icons/IconFilledWarning.vue"
import IconLock from "./components/icons/IconLock.vue"
import IconMoon from "./components/icons/IconMoon.vue"
import IconNotFound from "./components/icons/IconNotFound.vue"
import IconOutlinedBell from "./components/icons/IconOutlinedBell.vue"
import IconOutlinedDocument from "./components/icons/IconOutlinedDocument.vue"
import IconOutlinedHelp from "./components/icons/IconOutlinedHelp.vue"
import IconOutlinedLogout from "./components/icons/IconOutlinedLogout.vue"
import IconOutlinedEdit from "./components/icons/IconOutlinedEdit.vue"
import IconPlus from "./components/icons/IconPlus.vue"
import IconSave from "./components/icons/IconSave.vue"
import IconSun from "./components/icons/IconSun.vue"
import IconTrash from "./components/icons/IconTrash.vue"
import IconWarning from "./components/icons/IconWarning.vue"

/* Page components */
import PageHeader from "./components/page/PageHeader.vue"
import ListItem from "./components/page/list/ListItem.vue"
import ListItemConfirm from "./components/page/list/ListItemConfirm.vue"
import ListItemDetails from "./components/page/list/ListItemDetails.vue"
import ListItems from "./components/page/list/ListItems.vue"
import TabHeader from "./components/page/tab/TabHeader.vue"
import DocumentUploadItem from "./components/page/documents/DocumentUploadItem.vue"
import OrganizationItem from "./components/page/organizations/OrganizationItem.vue"

const useComponents = (app) => {
	app.component("Datepicker", Datepicker)

	app.component("CoreFooter", CoreFooter)
	app.component("CoreHeader", CoreHeader)
	app.component("CoreNotification", CoreNotification)
	app.component("CoreNotificationItem", CoreNotificationItem)
	app.component("CoreUserMenu", CoreUserMenu)
	app.component("CoreUserMenuItem", CoreUserMenuItem)

	app.component("CustomButton", CustomButton)
	app.component("CustomBadge", CustomBadge)
	app.component("CustomDialog", CustomDialog)
	app.component("CustomDialogActions", CustomDialogActions)
	app.component("CustomDialogBody", CustomDialogBody)
	app.component("CustomDialogTitle", CustomDialogTitle)
	app.component("CustomDropdown", CustomDropdown)
	app.component("CustomLink", CustomLink)
	app.component("CustomProgressCircle", CustomProgressCircle)
	app.component("CustomDatePicker", CustomDatePicker)
	app.component("CustomFileUpload", CustomFileUpload)
	app.component("CustomForm", CustomForm)
	app.component("CustomInput", CustomInput)
	app.component("CustomSelect", CustomSelect)
	app.component("CustomRadio", CustomRadio)
	app.component("CustomCheckbox", CustomCheckbox)
	app.component("CustomRow", CustomRow)
	app.component("CustomTabs", CustomTabs)
	app.component("CustomTab", CustomTab)
	app.component("CustomTabItems", CustomTabItems)
	app.component("CustomTabItem", CustomTabItem)
	app.component("CustomTransition", CustomTransition)
	app.component("CustomEntriesNotFound", CustomEntriesNotFound)

	app.component("AcceptMissionDialog", AcceptMissionDialog)
	app.component("RefuseMissionDialog", RefuseMissionDialog)
	app.component("UploadDocumentDialog", UploadDocumentDialog)
	app.component("DeleteDocumentDialog", DeleteDocumentDialog)
	app.component("ResetPasswordDialog", ResetPasswordDialog)

	app.component("IconBurger", IconBurger)
	app.component("IconCheck", IconCheck)
	app.component("IconChevronDown", IconChevronDown)
	app.component("IconChevronLeft", IconChevronLeft)
	app.component("IconChevronRight", IconChevronRight)
	app.component("IconCircleFilledCheck", IconCircleFilledCheck)
	app.component("IconCircleFilledClose", IconCircleFilledClose)
	app.component("IconCircleFilledInfo", IconCircleFilledInfo)
	app.component("IconCircleFilledPlus", IconCircleFilledPlus)
	app.component("IconCircleFilledWarning", IconCircleFilledWarning)
	app.component("IconCircleOutlineUser", IconCircleOutlineUser)
	app.component("IconClose", IconClose)
	app.component("IconFilledCog", IconFilledCog)
	app.component("IconFilledWarning", IconFilledWarning)
	app.component("IconLock", IconLock)
	app.component("IconMoon", IconMoon)
	app.component("IconNotFound", IconNotFound)
	app.component("IconOutlinedBell", IconOutlinedBell)
	app.component("IconOutlinedDocument", IconOutlinedDocument)
	app.component("IconOutlinedHelp", IconOutlinedHelp)
	app.component("IconOutlinedLogout", IconOutlinedLogout)
	app.component("IconOutlinedEdit", IconOutlinedEdit)
	app.component("IconPlus", IconPlus)
	app.component("IconSave", IconSave)
	app.component("IconSun", IconSun)
	app.component("IconTrash", IconTrash)
	app.component("IconWarning", IconWarning)

	app.component("PageHeader", PageHeader)
	app.component("ListItem", ListItem)
	app.component("ListItemConfirm", ListItemConfirm)
	app.component("ListItemDetails", ListItemDetails)
	app.component("ListItems", ListItems)
	app.component("TabHeader", TabHeader)
	app.component("DocumentUploadItem", DocumentUploadItem)
	app.component("OrganizationItem", OrganizationItem)

	return app
}

export {
	useComponents
}
