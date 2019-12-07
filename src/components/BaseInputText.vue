<template>
    <input type="text"
           :value="value"
           v-on="listeners"
    />
</template>

<script>
    export default {
        name: "BaseInputText",
        props: ['value'],
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: event => this.$emit('input', event.target.value)
                }
            }

        }
    }
</script>

<style scoped>

</style>