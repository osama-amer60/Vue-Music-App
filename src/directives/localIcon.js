export default{
    beforeMount(el,binding) {
        let iconClasses = `fa fa-${binding.value.icon} text-green-400 text-2xl`

        if(binding.value.right){
            iconClasses += '  float-right'
        }



        el.innerHTML +=`<i class="${iconClasses}"></i>`
    },
}