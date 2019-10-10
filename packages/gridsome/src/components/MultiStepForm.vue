<template>
  <div>
    <r-button @click="activeStep = 0">Open</r-button>
    <div v-for="(step, index) in steps" :key="index">
      <r-modal
        v-if="index === activeStep"
        :title="step.name"
        size="large"
        @close="activeStep = null"
      >
        <template v-slot:content>
          <div>
            <template v-if="activeStep === 0">
              <p style="margin: 10px 0;">
                <r-input placeholder="First name" />
              </p>
              <p style="margin: 10px 0;">
                <r-input placeholder="Last name" />
              </p>
            </template>
            <template v-if="activeStep === 1">
              <p style="margin: 10px 0;">
                <r-input placeholder="Address" />
              </p>
              <p style="margin: 10px 0;">
                <r-input placeholder="ZIP" />
              </p>
            </template>
            <template v-if="activeStep === 2">
              <p style="margin: 10px 0;">
                <r-input placeholder="E-mail" />
              </p>
              <p style="margin: 10px 0;">
                <r-input placeholder="Phone number" />
              </p>
            </template>
          </div>
        </template>

        <template slot="actions">
          <r-button v-if="activeStep !== 0" @click="activeStep = activeStep - 1"
            >Back
          </r-button>
          <r-button
            v-if="activeStep < steps.length - 1"
            @click="activeStep = activeStep + 1"
            >Next
          </r-button>
          <r-button v-if="activeStep === steps.length - 1" @click="finish"
            >Finish
          </r-button>
        </template>
      </r-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeStep: null,
      steps: [{ name: 'Step 1' }, { name: 'Step 2' }, { name: 'Step 3' }]
    }
  }
}
</script>

<style></style>
