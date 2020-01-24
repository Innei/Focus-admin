<template>
  <PageLayout>
    <div class="grid">
      <GridCard />
    </div>
  </PageLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import PageLayout from '@/layouts/PageLayout.vue'
import GridCard from './components/GridCard'

export default {
  components: {
    PageLayout,
    GridCard
  },
  computed: {
    ...mapGetters(['viewport'])
  }
}
</script>
