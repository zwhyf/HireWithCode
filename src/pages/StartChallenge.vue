<template>
  <div class="main markdown-body">
    <Card style="max-width: 450px;" class="col-xl-4 col-lg-6 col-md-10 col-sm-11 col-11 card">
      <h2>准备好接受挑战了吗？</h2>
      <Form ref="formValidate" :model="form_value_date" :rules="ruleValidate" label-position="top">
        <FormItem label="GitHub ID" prop="gitHubId">
          <Input v-model="form_value_date.gitHubId"
                 placeholder="请输入你的GitHub ID"
                 style="width: 100%"
          ></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
          <Input v-model="form_value_date.mail" placeholder="请输入你的邮箱"></Input>
        </FormItem>
        <FormItem>
          <Button shape="circle" type="primary" @click="handleSubmit()" long>接受挑战</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script setup lang="ts">
  import 'github-markdown-css/github-markdown.css';
  import {ref} from "vue"
  import {useRouter} from "vue-router";
  import {Message} from "view-ui-plus";


  const router = useRouter()
  let form_value_date = ref({
    gitHubId: '',
    mail: ''
  })
  const formValidate = ref()
  const ruleValidate = {
    gitHubId: [
      { required: true, message: 'GitHub ID不能为空', trigger: 'blur' }
    ],
    mail: [
      { required: true, message: '邮箱不能为空', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
  }
  function handleSubmit () {
    formValidate.value.validate((valid :boolean) => {
      if (valid) {
        Message.success('接受挑战成功!');
        setTimeout(()=>{
          router.push({
            name:'completeChallenge'
          })
        },1500)
      } else {
        Message.error('请完善信息！');
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
