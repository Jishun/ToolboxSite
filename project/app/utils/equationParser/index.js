import yaml from 'js-yaml'

const equationParser = {
    loadTemplate(src){
        return yaml.load(src);
    }
}

export default equationParser;