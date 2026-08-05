// ═══════════ إعدادات معرض الحملات - اليوم الثالث ═══════════
// نفس مشروع Firebase - مجموعة answers المفتوحة بالقواعد.
// الحملات وثائق بـ session=SESSION، والإعجابات وثيقة عدّاد واحدة لكل حملة
// بمعرّف ثابت like-<id> تُزاد ذرّياً بـ:commit (قراءات أقل بكثير من وثيقة لكل إعجاب).
const C_CONFIG = {
  PROJECT_ID: "vak-quiz-96d5f",
  API_KEY: "AIzaSyADogtO8s6kDuTrs1Tup6J4acY47T5DmdM",
  COLLECTION: "answers",
  SESSION: "ccuai-d3",          // حملات هذه الجلسة - غيّره لدورة جديدة
  LIKES_SESSION: "ccuai-d3-likes"
};
const C_BASE = `https://firestore.googleapis.com/v1/projects/${C_CONFIG.PROJECT_ID}/databases/(default)/documents`;
const C_DOCPATH = `projects/${C_CONFIG.PROJECT_ID}/databases/(default)/documents/${C_CONFIG.COLLECTION}`;
const C_RQ_URL = `${C_BASE}:runQuery?key=${C_CONFIG.API_KEY}`;
const C_POST_URL = `${C_BASE}/${C_CONFIG.COLLECTION}?key=${C_CONFIG.API_KEY}`;
const C_COMMIT_URL = `${C_BASE.replace('/documents','')}/documents:commit?key=${C_CONFIG.API_KEY}`;
function sessionQuery(session){
  return {structuredQuery:{
    from:[{collectionId:C_CONFIG.COLLECTION}],
    where:{fieldFilter:{field:{fieldPath:'session'},op:'EQUAL',value:{stringValue:session}}},
    limit:300
  }};
}
// زيادة عدّاد إعجاب حملة ذرّياً (ينشئ الوثيقة إن لم توجد)
async function likeCampaign(id){
  const body={writes:[{
    update:{name:`${C_DOCPATH}/like-${id}`,fields:{session:{stringValue:C_CONFIG.LIKES_SESSION}}},
    updateMask:{fieldPaths:['session']},
    updateTransforms:[{fieldPath:'n',increment:{integerValue:'1'}}]
  }]};
  const r=await fetch(C_COMMIT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  return r.ok;
}
