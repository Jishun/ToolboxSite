const seekable = function(str){
        const _this = this;
        const src = str;
        var index = 0;
        var lastIndex = 0;
        
        _this.readTo = function(){
            for(; index < str.length; index++){
                for(var i = 0; i < arguments.length; i++){
                    var pattern = arguments[i];
                    if(str.slice(index, index + pattern.length) === pattern){
                        var passed = str.slice(lastIndex, index);
                        index+= pattern.length;
                        lastIndex = index;
                        return {
                            matched: pattern,
                            passed
                        }
                    }
                }
            }
            return {
                matched: '',
                passed: str.slice(lastIndex, index)
            }
        };
        _this.read = function(size){
            
            return {
                content: str.slice(index, index+=size)
            };
        }
    }
export default seekable;