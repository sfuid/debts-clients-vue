<template>
  <div>
    <section class="container">
      <h1>Список должников</h1>
      <Debts />
    </section>
  </div>
</template>

<script>
import Debts from "~/components/Debts/index.vue";

export default {
  components: {
    Debts
  }
};
</script>

