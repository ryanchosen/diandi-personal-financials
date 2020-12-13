<template>
  <Layout class-prefix="layout">
 <Tags :data-source="tags"/>
    <Notes/>
    <Types/>
    <NumberPad/>
  </Layout>
</template>

<script>

import Tags from '@/components/Tags.vue';
import Notes from '@/components/Notes.vue';
import Types from '@/components/Types.vue';
import NumberPad from '@/components/NumberPad.vue';
export default {
  name: 'Money',
  components: {NumberPad, Types, Notes, Tags},
  data(){
    return{
      tags:['衣','食','住','行']
    }
  }
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