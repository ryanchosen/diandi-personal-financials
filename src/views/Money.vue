<template>
  <Layout class-prefix="layout">
 <Tags/>
    <Notes/>
    <Types/>
    <NumberPad/>
  </Layout>
</template>

<script lang="ts">

import Tags from '@/components/Tags.vue';
import Notes from '@/components/Notes.vue';
import Types from '@/components/Types.vue';
import NumberPad from '@/components/NumberPad.vue';
export default {
  name: 'Money',
  components: {NumberPad, Types, Notes, Tags},
};
</script>
<style lang="scss">
.layout-content{
  border:1px solid red;
  display:flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped></style>