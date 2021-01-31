import yaml from 'js-yaml'

const equationParser = {
    loadTemplate(src){
        return yaml.load(src);
    },
    mathEscapeHtml(str){
        if(typeof(str) == 'string')
            return str;
        return str;
    }
}

export default equationParser;


// onInputChange2(e){
//     let inputJson = equation.loadTemplate(e.target.value);
//   var ss = new Seekable(inputJson.statement);
//   let content = {};
//   let lines = [];
//   do{
//       content = ss.readTo('@{', '}@', '\r\n', '\n');
//       if(content.passed.length > 0){
//           switch(content.matched){
//               case '':
//               case '\n':
//               case '@{':
//                   lines.push(content.passed);
//                   break;
//               case '}@':
//                   try {
//                       var segments = content.passed.split('=');
//                       var columns = [];
//                       for(var i = 0; i < segments.length; i++){
//                           var parsed = parse(segments[i]);
//                           var jax = this.mj(parsed.toTex({parenthesis: 'keep'}));
//                           columns.push(jax.outerHTML);
//                           if(i < segments.length - 1){
//                               columns.push(' = ')
//                           }
//                       }
//                       if(columns.length > 1){
//                           lines.push(columns);
//                       }else{
//                           lines.push(columns[0]);
//                       }
//                   }catch(error){
//                       lines.push(JSON.stringify(error, Object.getOwnPropertyNames(error)));
//                   }
//                   break;
//           }
//       }
//   }while(content.matched.length)
  
//   var vars = this.GetVariables(inputJson);
//   this.setState({inputData : e.target.value, lines, answer: inputJson.answer, vars });
// }