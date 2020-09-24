<template>
	<div>
		<home-page />
	</div>
</template>



<script>
export default {
	components:{
		'home-page': () => import("../components/home/HomePage")
	}
}
</script>