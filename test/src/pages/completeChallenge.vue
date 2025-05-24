<template>
  <div class="main markdown-body">
    <Card style="max-width: 450px;" class="col-xl-4 col-lg-6 col-md-10 col-sm-11 col-11 card">
      <h2>请提挑战交作品</h2>
      <Form ref="formValidate" :model="form_value_date" :rules="ruleValidate" label-position="top">
        <FormItem label="GitHub 仓库 url" prop="gitHubUrl">
          <Input v-model="form_value_date.gitHubUrl"
                 placeholder="https://github.com/username/projectname"
                 style="width: 100%"
          ></Input>
        </FormItem>
        <FormItem label="vercel在线体验url地址" prop="vercelUrl">
          <Input v-model="form_value_date.vercelUrl" placeholder="https://your-project.vercel.app"></Input>
        </FormItem>
        <FormItem>
          <Button shape="circle" type="primary" @click="handleSubmit()" long>提交作品</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';
import {ref} from "vue"
import {Message} from "view-ui-plus";
let form_value_date = ref({
  gitHubUrl: '',
  vercelUrl: ''
})
const formValidate = ref()
const gitHubValidateUrl = (rule :any, value :string, callback :any) => {
  const urlRegex = /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-5]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  if(value===''){
    callback(new Error('GitHub仓库url地址不能为空'));
  }
  else if (!urlRegex.test(value)) {
    callback(new Error('请输入有效的GitHub仓库url地址'));
  }
};

const vercelValidateUrl = (rule :any, value :string, callback :any) => {
  const urlRegex = /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-5]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  if(value===''){
    callback(new Error('vercel在线体验url地址不能为空'));
  }
  else if (!urlRegex.test(value)) {
    callback(new Error('请输入有效的vercel在线体验url地址'));
  }
};
const ruleValidate = {
  gitHubUrl: [
    {required: true, validator:gitHubValidateUrl, trigger: 'blur' }
  ],
  vercelUrl: [
    {required: true, validator:vercelValidateUrl, trigger: 'blur' }
  ]
}


function handleSubmit () {
  formValidate.value.validate((valid :boolean) => {
    console.log(111,valid)
    if (valid) {
      Message.success('提交成功，挑战完成!');
    } else {
      Message.error('请提供有效的作品url地址！');
    }
  })
}
</script>

<style lang="scss">
.main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .card{

    h2{
      border: none;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
