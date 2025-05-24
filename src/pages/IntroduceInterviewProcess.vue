<template>
  <div class="main">
    <div v-show="markdownText!==''" class="content  col-xl-6 col-lg-10 col-md-10 col-sm-11 col-11">
      <div class="markdown-body"
           v-if="markdownText!==''"
           v-html="markdownHtml"
           style="background-color: white;color: black"
      >
      </div>
      <div class="submit">
        <Checkbox v-model="check">我已知晓以上全部流程和说明</Checkbox>
        <Button :disabled="!check"
                type="primary"
                @click="toNext"
                shape="circle"
        >进入下一步</Button>
      </div>
    </div>
    <Spin
        fix
        size="large"
        :show="markdownText===''"
    >
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>面试文档加载中...</div>
    </Spin>
  </div>
</template>

<script setup lang="ts">
  import {ref,onMounted} from "vue";
  import {marked} from 'marked';
  import {useRouter} from "vue-router";
  import 'github-markdown-css/github-markdown.css';

  let markdownText = ref("")
  let markdownHtml = ref()
  let check = ref(false)
  const router = useRouter()

  interface optionsType {
    timeout :number
  }
  async function fetchWithTimeout(resource :string, options : optionsType) {
    const { timeout  = 3000 } = options; // 默认3秒超时

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(id); // 清除定时器，防止超时处理

    return response;
  }

  onMounted(()=>{
    fetchWithTimeout('https://raw.githubusercontent.com/InfiniteStatesInc/HireWithCode/refs/heads/main/README.md', { timeout: 5000 })
        .then(response => {
          if (!response.ok) {
            throw new Error('网络响应失败');
          }
          return response.text();
        })
        .then(data => {
          markdownText.value = data
          console.log(data)
          markdownHtml.value = marked.parse(markdownText.value)
        })
        .catch(error => {
          markdownText.value = '# HireWithCode - 面试者挑战项目\n' +
              '\n' +
              '欢迎来到 `HireWithCode` 项目！这是一个专为技术面试者设计的真实项目挑战。目前，这个仓库刚刚起步，没有任何代码——只有待实现的功能（TODOs）。你的任务是将这些TODOs转变为实际的代码，提交你的Pull Request（PR）就是你面试的一部分挑战。\n' +
              '\n' +
              '## 产品功能 TODOs\n' +
              '产品是一个 Web 网站（PC端、移动端兼容），分为 4 个步骤的页面：\n' +
              '- [ ] **欢迎语**：Logo + 一句话欢迎语（垂直水平居中，2 秒后自动进入下一页 *面试引导*）`欢迎来到 infist 线上面试环节，期待你的加入！` [logo](./logo.png) \n' +
              '- [ ] **面试引导**：介绍面试的流程和说明（Markdown 文案展示，需要渲染为富文本样式）[页面文案 markdown](https://raw.githubusercontent.com/InfiniteStatesInc/HireWithCode/refs/heads/main/README.md)\n' +
              '- [ ] **接受挑战**：表单，`input`(用户输入自己的 github id) 、`input`(邮箱)、`submit button`(接受挑战)\n' +
              '- [ ] **完成挑战**：表单，`input`(github 仓库 url)、`input`([Vercel](https://vercel.app/) 在线体验地址)、`submit button`(提交作品)\n' +
              '\n' +
              '## 如何参与？\n' +
              '\n' +
              '1. 克隆仓库到你的本地机器。\n' +
              '2. 按照你对这个产品的理解，自行开发 TODO\n' +
              '4. 确保你的代码是可以运行的\n' +
              '5. 完成挑战后，通过Pull Request将你的代码提交给我们。\n' +
              '6. 在PR中附上你的Vercel在线体验链接。\n' +
              '\n' +
              '> 备注说明：\n' +
              '> 这个项目的步骤 3、4 是是需要服务端能力的（API + 数据库），如果你不具备全栈的经验，可以考虑使用 [supabase](https://supabase.com/) 作为本项目的服务端（或者仅仅实现前端静态网页）\n' +
              '\n' +
              '我们会审查每一个PR，并以此作为面试的一部分。我们期待看到你的创意和技术实力！\n' +
              '\n' +
              '祝你好运！'
          markdownHtml.value = marked.parse(markdownText.value)
          if (error.name === 'AbortError') {
            console.error('网络请求超时');
          } else {
            console.error('网络操作失败', error);
          }
        })
  })

  function toNext(){
    router.push({
      name:'startChallenge'
    })
  }


</script>

<style scoped lang="scss">
.main{
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .content{
    padding: 5vh;
    box-shadow:0 0 10px rgba(0, 0, 0, 0.3);
    height: auto;
    margin: 10px 0;
    .submit{
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 20px;
      .ivu-checkbox-wrapper{
        margin-bottom: 10px;
      }
    }
  }
}

.demo-spin-col .circular {
  width:25px;
  height:25px;
}
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.demo-spin-col{
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}

</style>