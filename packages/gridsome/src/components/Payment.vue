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
    </template>
    <template v-slot:secondary>
      <r-checkbox
        label=" Authorize company to charge your payment card,and agree to be bound by the terms of use and privacy policy"
      />
    </template>
    <template v-slot:actions>
      <r-button type="default">Canclel</r-button>
      <r-button type="primary">Submit</r-button>
    </template>
  </r-tile>
</template>

<style>
.Payment {
  max-width: 400px;
}
.PaymentRow {
  margin: 1rem 0;
}
</style>
