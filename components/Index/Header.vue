<template>
  <div class="headerLogo">
    <header-logo />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import HeaderLogo from "~/components/Index/HeaderLogo.vue";

@Component({
  components: {HeaderLogo}
})
export default class Header extends Vue {


}
</script>

