class BlogModal extends HTMLElement{
    static get observedAttributes(){
        return['open','title','subtitle','synopsis','cover'];
    }
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.close=new CustomEvent('close',{
            bubbles:true,
            cancelable:false,
            detail:{
                open:false
            }
        });
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(attrName,oldValue,newValue){
        if(attrName !=='open' && oldValue!==newValue)
        {
            this[attrName]=newValue;
        }
        else if(attrName==='open') {
            this[attrName]=this.hasAttribute(attrName);
        }
        this.render();
    }
    render(){
        const {shadowRoot}=this;
        const templatenode=document.getElementById('modal-template');
        const loading = [
            {trasform:'rotate(0deg)'},
            {trasform:'rotate(360deg)'}
        ];
        const loadingtime={
            duration:3000,
            iterations:50
        }

        shadowRoot.innerHTML='';
        if(templatenode){
                const instance=document.importNode(templatenode.content,true);
                const close=instance.querySelector('.close');
                const wrapper=instance.querySelector('.wrapper');
                const title=instance.querySelector('.title');
                const subtitle=instance.querySelector('.subtitle');
                const cover=instance.querySelector('.cover');
                const synopsis=instance.querySelector('.synopsis');
                const loader=instance.querySelector('.loader');
                const loadanimation=loader.animate(loading,loadingtime);
                const closeEvent=this.close;
                close.onclick=function(){
                    this.dispatchEvent(closeEvent);
                }
                shadowRoot.addEventListener('close',()=>{
                    wrapper.classList.remove('open');
                    this['open']=false;
                })
                if(this['open']===true)
                {
                    instance.querySelector('.wrapper').classList.add('open');
                }
                loadanimation.play();
                let blogmodal=this;
                setTimeout(() => {
                    loadanimation.finish();
                    loader.classList.add('close');
                    title.innerHTML=blogmodal['title'];
                    subtitle.innerHTML=blogmodal['subtitle'];
                    synopsis.innerHTML=blogmodal['synopsis'];
                    cover.src=blogmodal['cover'];
                }, 3000);
                shadowRoot.appendChild(instance);
        }else{
            shadowRoot.innerHTML='<p>SHadowROOT Failed</p>';
        }

    }
}
customElements.define('blog-modal',BlogModal);