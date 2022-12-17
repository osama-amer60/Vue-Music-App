export default{
    beforeMount(el,binding) {
        let iconClasses = `fa fa-${binding.value} text-2xl`

        if(binding.modifiers.right){
            iconClasses += '  float-right'
        }

        if(binding.modifiers.yellow){
            iconClasses += '  text-yellow-400'
        }else{
            iconClasses+='  text-green-400'
        }


        el.innerHTML +=`<i class="${iconClasses}"></i>`
    },
}