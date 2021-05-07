<template>
  <main class="profiles">
    <PageHeader label="Mon profil" />
    <div v-if="show" class="profiles__body">
      <CustomTabs v-model="tab">
        <CustomTab icon="IconCircleOutlineUser">Informations</CustomTab>
        <CustomTab icon="IconCalendar">Absences</CustomTab>
        <CustomTab icon="IconBook">Spécialités</CustomTab>
        <CustomTab icon="IconOutlinedCog">Préférences</CustomTab>
      </CustomTabs>
      <CustomTabItems v-model="tab">
        <CustomTabItem>
          <TabHeader
            :loading="loading"
            button-label="Enregistrer"
            button-icon="IconSave"
            icon="IconCircleOutlineUser"
            title="Mes informations"
            @callback="saveInformations"
          />
          <CustomForm class="profiles__form">
            <CustomRow>
              <CustomSelect
                v-model="user.civility"
                :items="civility.value"
                label="Civilité"
                placeholder="Civilité"
                width="300px"
              />
            </CustomRow>
            <CustomRow>
              <CustomInput
                v-model="user.firstName"
                label="Nom"
                placeholder="Nom"
                width="300px"
              />
              <CustomInput
                v-model="user.lastName"
                label="Prénom"
                placeholder="Prénom"
                width="300px"
              />
            </CustomRow>
            <CustomRow>
              <CustomInput
                v-model="user.phone"
                label="Téléphone"
                mobile
                placeholder="Téléphone mobile"
                width="300px"
              />
              <CustomInput
                v-model="user.email"
                label="Adresse e-mail"
                mail
                placeholder="Adresse mail"
                width="300px"
                native-type="email"
              />
            </CustomRow>
            <CustomRow>
              <CustomInput
                v-model="user.ssn"
                label="N° sécurité sociale"
                mobile
                placeholder="N° sécurité sociale"
                width="300px"
              />
              <CustomInput
                v-model="user.adeli"
                label="N° adéli"
                mail
                placeholder="N° adéli"
                width="300px"
              />
            </CustomRow>
            <h2>Adresse</h2>
            <CustomRow>
              <CustomInput
                v-model="user.street"
                label="Rue"
                placeholder="Rue"
                width="calc(600px + 1rem)"
              />
            </CustomRow>
            <CustomRow>
              <CustomInput
                v-model="user.postalCode"
                label="Code postal"
                placeholder="Code postal"
                postal
                width="300px"
              />
              <CustomInput
                v-model="user.city"
                label="Ville"
                placeholder="Ville"
                width="300px"
              />
            </CustomRow>
            <h2>Mot de passe</h2>
            <CustomRow>
              <CustomInput
                ref="oldPasswordInput"
                v-model="oldPassword"
                label="Ancien mot de passe"
                placeholder="Ancien mot de passe"
                :rules="[(v) => !!v || 'Ce champs est obligatoire.']"
                width="calc(600px + 1rem)"
                required
                native-type="password"
              />
            </CustomRow>
            <CustomRow>
              <CustomInput
                ref="newPasswordInput"
                v-model="newPassword"
                label="Nouveau mot de passe"
                placeholder="Nouveau mot de passe"
                :rules="[(v) => !!v || 'Ce champs est obligatoire.']"
                width="calc(600px + 1rem)"
                required
                native-type="password"
              />
            </CustomRow>
            <CustomRow>
              <CustomInput
                ref="newPasswordConfirmInput"
                v-model="newPasswordConfirm"
                label="Confirmer le mot de passe"
                placeholder="Confirmer le mot de passe"
                :rules="[
                  (v) => !!v || 'Ce champs est obligatoire.',
                  (v) => v === newPassword || 'Mot de passes non identiques.',
                ]"
                width="calc(600px + 1rem)"
                required
                native-type="password"
              />
            </CustomRow>
            <CustomRow class="mt-4">
              <CustomButton
                class="tabs-header__button"
                icon-left="IconLock"
                block
                center
                style="max-width: calc(600px + 1rem);"
                @click="resetPassword"
                :loading="loadingPassword"
                >Changer le mot de passe</CustomButton
              >
            </CustomRow>
          </CustomForm>
        </CustomTabItem>
        <CustomTabItem>
          <TabHeader
            :loading="loading"
            button-icon="IconSave"
            button-label="Enregistrer"
            icon="IconCalendar"
            title="Absence"
            @callback="saveAbsence"
          />
          <CustomForm class="profiles__form">
            <CustomRow>
              <div class="custom-input">
                <label>Date de début</label>
                <datepicker
                  v-model="user.absenceStartDate"
                  :locale="locale"
                  inputFormat="dd-MM-yyyy"
                  startingView="year"
                />
              </div>
              <div class="custom-input">
                <label>Date de fin</label>
                <datepicker
                  v-model="user.absenceEndDate"
                  :locale="locale"
                  inputFormat="dd-MM-yyyy"
                  startingView="year"
                />
              </div>
            </CustomRow>
          </CustomForm>
        </CustomTabItem>
        <CustomTabItem>
          <TabHeader
            :loading="loading"
            button-icon="IconSave"
            button-label="Enregistrer"
            icon="IconBook"
            title="Spécialités"
            @callback="saveInformations"
          />
          <CustomForm class="profiles__form">
            <CustomRow>
              <CustomSelect
                v-model="user.fonction"
                :items="fonction.value"
                label="Métier"
                placeholder="Métier"
                hint="Ce champs n'est pas modifiable"
                width="300px"
                @update:modelValue="changeFonction"
                disabled
              />
              <CustomSelect
                v-model="user.pole"
                multiple
                :items="polePickListed"
                label="Compétences"
                placeholder="Compétences"
                width="500px"
              />
            </CustomRow>
            <div class="profiles__form__action">
              <label>Type de planning</label>
              <div class="profiles__form__planning">
                <CustomButton
                  :class="scheduleDay ? 'profiles__planning--active' : ''"
                  text
                  @click="onChangeSchedule('Day')"
                >
                  <IconSun />
                  Jour
                </CustomButton>
                <CustomButton
                  :class="scheduleNight ? 'profiles__planning--active' : ''"
                  text
                  @click="onChangeSchedule('Night')"
                >
                  <IconMoon />
                  Nuit
                </CustomButton>
              </div>
            </div>
          </CustomForm>
        </CustomTabItem>
        <CustomTabItem>
          <TabHeader
            :loading="loading"
            button-icon="IconSave"
            button-label="Enregistrer"
            icon="IconOutlinedCog"
            title="Préférence"
            @callback="savePreference"
          />
          <form class="profiles__form profiles__form-settings">
            <CustomRow>
              <CustomCheckbox
                v-model="preferences"
                label="Notfication email"
                name="email"
                value="Email"
                right-label
              />
            </CustomRow>
            <CustomRow>
              <CustomCheckbox
                v-model="preferences"
                label="Notfication mobile"
                name="mobile"
                value="App"
                right-label
              />
            </CustomRow>
            <CustomRow>
              <CustomCheckbox
                v-model="theme"
                label="Thème sombre (pour cet appareil)"
                name="sombre"
                true-value="dark"
                false-value="light"
                right-label
              />
            </CustomRow>
          </form>
        </CustomTabItem>
      </CustomTabItems>
    </div>
    <div v-else class="page-loader">
      <CustomProgressCircle color="var(--color-blue-primary)" indeterminate />
    </div>
  </main>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { fr } from "date-fns/locale";
import {
  findPickList,
  findSobjectsForUserConnected,
  findSobjectsForUserConnectedFilteredByField,
  SOBJECTS_FIELD,
} from "../api/sobjects";
import { moveTawkToWidget } from "../utils";

export default defineComponent({
  name: "Profiles",
  title: "Mon profile - Kistaff",
  setup: () => {
    const store = useStore();
    const locale = fr;

    /* Datas */
    const show = ref(false);
    const tab = ref(0);
    const civility = reactive({});
    const fonction = reactive({});
    const pole = reactive({});
    const user = reactive({
      civility: store.state.user.Salutation,
      firstName: store.state.user.FirstName,
      lastName: store.state.user.LastName,
      phone: store.state.user.MobilePhone,
      email: store.state.user.Email,
      street: store.state.user.MailingAddress?.street,
      postalCode: store.state.user.MailingAddress?.postalCode,
      city: store.state.user.MailingAddress?.city,
      ssn: store.state.user.xDecrypted_SSN__c,
      adeli: store.state.user.xNumero_ADELI__c,
      fonction: store.state.user.xType_of_service__c,
      pole: store.state.user.xServices__c,
      schedule: store.state.user.xType_of_Schedule__c,
      absenceStartDate: store.state.user.xLeave_From__c
        ? new Date(store.state.user.xLeave_From__c)
        : null,
      absenceEndDate: store.state.user.xLeave_To__c
        ? new Date(store.state.user.xLeave_To__c)
        : null,
    });

    const scheduleDay = ref(user.schedule === "Day" || user.schedule === "All");
    const scheduleNight = ref(
      user.schedule === "Night" || user.schedule === "All"
    );
    const loading = ref(false);
    const resetLoading = ref(false);
    const resetPasswordDialogOpen = ref(false);
    const preferences = ref([]);
    const theme = ref("");
    const pickLists = ref([]);
    const polePickListed = ref([]);

    // Passwords
    const oldPassword = ref("");
    const newPassword = ref("");
    const newPasswordConfirm = ref("");
    const oldPasswordInput = ref(null);
    const newPasswordInput = ref(null);
    const newPasswordConfirmInput = ref(null);
    const loadingPassword = ref(false);

    /* Methods */
    const onChangeSchedule = (type) => {
      if (type === "Day") {
        scheduleDay.value = !scheduleDay.value;
      } else if (type === "Night") {
        scheduleNight.value = !scheduleNight.value;
      }

      if (scheduleDay.value) {
        user.schedule = "Day";
      } else if (scheduleNight.value) {
        user.schedule = "Night";
      }

      if (
        (scheduleDay.value && scheduleNight.value) ||
        (!scheduleDay.value && !scheduleNight.value)
      ) {
        user.schedule = "All";
      }
    };
    const saveInformations = async () => {
      try {
        loading.value = true;
        await store.dispatch("editUser", {
          id: store.state.user.Id,
          user: {
            Salutation: user.civility,
            FirstName: user.firstName,
            LastName: user.lastName,
            MobilePhone: user.phone,
            Email: user.email,
            xSSN__c: user.ssn,
            xNumero_ADELI__c: user.adeli,
            MailingStreet: user.street,
            MailingPostalCode: user.postalCode,
            MailingCity: user.city,
            xType_of_service__c: user.fonction,
            xServices__c: user.pole,
            xType_of_Schedule__c: user.schedule,
          },
        });
      } catch (e) {}
      loading.value = false;
    };
    const saveAbsence = async () => {
      try {
        loading.value = true;
        await store.dispatch("editUser", {
          id: store.state.user.Id,
          user: {
            xLeave_From__c: user.absenceStartDate,
            xLeave_To__c: user.absenceEndDate,
          },
        });
      } catch (e) {}
      loading.value = false;
    };
    const savePreference = async () => {
      try {
        loading.value = true;
        await store.dispatch("editUser", {
          id: store.state.user.Id,
          user: {
            xPrimary_Channel__c: preferences.value.includes("Email")
              ? "Email"
              : "",
            xSecondary_Channel__c: preferences.value.includes("App")
              ? "App"
              : "",
          },
        });
        localStorage.setItem("theme", theme.value);
        store.commit("setTheme", theme.value)

        if (
          localStorage.getItem("theme") === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          localStorage.setItem("theme", "dark");
          document.body.classList.add("theme-dark");
        } else {
          localStorage.setItem("theme", "light");
          document.body.classList.remove("theme-dark");
        }
      } catch (e) {}

      loading.value = false;
    };
    const changeFonction = (v, defaultPole = null) => {
      user.pole = defaultPole || null;
      polePickListed.value = pickLists.value[v]?.map((p) =>
        pole.value.find((pol) => pol.key === p)
      );
    };
    const resetPassword = async (e) => {
      e.preventDefault();
      loadingPassword.value = true;
      oldPasswordInput.value.validate();
      newPasswordInput.value.validate();
      newPasswordConfirmInput.value.validate();

      const isFormValid =
        !oldPasswordInput.value.inputError &&
        !newPasswordInput.value.inputError &&
        !newPasswordConfirmInput.value.inputError;

      if (isFormValid) {
        try {
          await store.dispatch("resetPassword", {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
          });
        } catch (e) {}
      }

      loadingPassword.value = false;
    };

    /* Lifecycle Hooks */
    onMounted(async () => {
      await findSobjectsForUserConnected();

      civility.value = await findSobjectsForUserConnectedFilteredByField(
        SOBJECTS_FIELD.CIVILITY
      );
      fonction.value = await findSobjectsForUserConnectedFilteredByField(
        SOBJECTS_FIELD.FONCTION
      );
      pole.value = await findSobjectsForUserConnectedFilteredByField(
        SOBJECTS_FIELD.POLE
      );
      pickLists.value = await findPickList();

      if (store.state.user.xPrimary_Channel__c) {
        preferences.value.push(store.state.user.xPrimary_Channel__c);
      }
      if (store.state.user.xSecondary_Channel__c) {
        preferences.value.push(store.state.user.xSecondary_Channel__c);
      }

      if (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        theme.value = "dark";
        localStorage.setItem("theme", "dark");
        document.body.classList.add("theme-dark");
      } else {
        theme.value = "light";
        localStorage.setItem("theme", "light");
        document.body.classList.remove("theme");
      }

      changeFonction(user.fonction, user.pole);

      show.value = true;
      moveTawkToWidget();
    });

    return {
      locale,
      /* Datas */
      show,
      tab,
      civility,
      fonction,
      pole,
      user,
      scheduleDay,
      scheduleNight,
      loading,
      resetLoading,
      resetPasswordDialogOpen,
      preferences,
      theme,
      pickLists,
      polePickListed,
      // Passwords
      oldPassword,
      newPassword,
      newPasswordConfirm,
      oldPasswordInput,
      newPasswordInput,
      newPasswordConfirmInput,
      loadingPassword,
      /* Methods */
      onChangeSchedule,
      saveInformations,
      saveAbsence,
      savePreference,
      changeFonction,
      resetPassword,
    };
  },
});
</script>
