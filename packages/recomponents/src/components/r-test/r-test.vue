<template>
    MY FIRST VUE 3 TEST components
    <r-button type="primary" capitalizeFirstLetter>click me</r-button>
     <div role="radiogroup" aria-label="Billing Schedule">
                    <h2>Billing Schedule</h2>
                    <r-radio
                        label="Forever (until canceled)"
                        name="theGroupName"
                        value="forever"/>
                    <r-radio
                        label="Limited to XX periods"
                        name="theGroupName"
                        value="limited"/>
     </div>

     <r-avatar
        initials
        description="test description"
        image="https://www.meme-arsenal.com/memes/86b1de6ff6981be012d40bf26c6992ab.jpg"
        color="green">
    </r-avatar>

     <r-badge type="warning">
        test badge
    </r-badge>

    <r-toggle
        label="test label"
        name="test name"
        :disabled="false"
        value="true"
    />

</template>
