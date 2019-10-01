<template>
  <r-tile class="Payment">
    <template v-slot:primary>
      <div class="PaymentRow">
        <r-input placeholder="First name" />
      </div>
      <div class="PaymentRow">
        <r-input placeholder="Last name" />
      </div>
      <div class="PaymentRow">
        <r-input placeholder="Email" />
      </div>
      <div class="PaymentRow">
        <r-input placeholder="Phone" />
      </div>
      <div class="PaymentRow">
        <r-input placeholder="Credit card" />
      </div>
      <div class="PaymentRow">
        <r-select
          v-model="country"
          placeholder="Country"
          :multiple="false"
          :options="['USA', 'Russia', 'Canada', 'Ukraine']"
        />
      </div>
      <div class="PaymentRow">
        <label class="r-field-label">Schedule</label>
        <div class="r-time-range">
          <r-time-picker v-model="time.start" label="Start" />
          <r-time-picker v-model="time.end" label="End" />
        </div>
      </div>
    </template>
    <template v-slot:secondary>
      <r-checkbox
        label=" Authorize company to charge your payment card,and agree to be bound by the terms of use and privacy policy"
      />
    </template>
    <template v-slot:actions>
      <r-button type="default">Cancel</r-button>
      <r-button type="primary">Submit</r-button>
    </template>
  </r-tile>
</template>

<script>
export default {
  data() {
    return {
      country: null,
      time: {
        start: null,
        end: null
      }
    }
  }
}
</script>

<style>
.Payment {
  max-width: 400px;
}

.PaymentRow {
  margin: 1rem 0;
  text-align: left;
}
</style>
