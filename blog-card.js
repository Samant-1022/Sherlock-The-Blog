// const titles=[
//     {title:'The Five Orange Pips',subtitle:' A delivery of inocous letter followed by death'},
//     {title:'A study in Scarlett',subtitle:'John Watson meets SHerlock'},
//     {title:'The Hound of Baskervilles',subtitle:'A mysterious houdn terrifies the town'}
// ];
class BlogCard extends HTMLElement{
    static get observedAttributes(){
        return['title','subtitle','cover'];
    }
    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(attrName,oldValue,newValue){
        if(oldValue!==newValue && newValue!==null)
        {
            this[attrName]=newValue;
        }
    }
    render(){
        const {shadowRoot}=this;
        const templatenode=document.getElementById('card-template');
        shadowRoot.innerHTML='';
        if(templatenode){
           const instance =document.importNode(templatenode.content,true);
           instance.querySelector('.title').innerHTML=this['title'];
           instance.querySelector('.subtitle').innerHTML=this['subtitle'];
           instance.querySelector('.cover').src=this['cover'];
           shadowRoot.appendChild(instance);
        }else{
            shadowRoot.innerHTML='<p>SHadowROOT Failed</p>';
        }

    }
}
customElements.define('blog-card',BlogCard);