// ═══════════ إعدادات أداة التصويت الحي - اليوم الثاني ═══════════
// نفس مشروع Firebase - مجموعة answers المفتوحة بالقواعد.
// وثيقة حالة الجولة تُكتب بمعرّف ثابت STATE_DOC داخل نفس المجموعة.
const V_CONFIG = {
  PROJECT_ID: "vak-quiz-96d5f",
  API_KEY: "AIzaSyADogtO8s6kDuTrs1Tup6J4acY47T5DmdM",
  COLLECTION: "answers",
  STATE_DOC: "ccuai-d2-state",     // وثيقة الجولة الحالية (اسم المتدرب + رقم الجولة)
  VOTES_SESSION: "ccuai-d2-votes"  // وسم أصوات هذه الجلسة - غيّره لدورة جديدة
};
const V_BASE = `https://firestore.googleapis.com/v1/projects/${V_CONFIG.PROJECT_ID}/databases/(default)/documents`;
const V_STATE_URL = `${V_BASE}/${V_CONFIG.COLLECTION}/${V_CONFIG.STATE_DOC}?key=${V_CONFIG.API_KEY}`;
const V_RQ_URL = `${V_BASE}:runQuery?key=${V_CONFIG.API_KEY}`;
const V_POST_URL = `${V_BASE}/${V_CONFIG.COLLECTION}?key=${V_CONFIG.API_KEY}`;
// جلب أصوات جولة محددة (فلترة مساواة مزدوجة - لا تحتاج فهرساً مركّباً)
function votesQuery(round){
  return {structuredQuery:{
    from:[{collectionId:V_CONFIG.COLLECTION}],
    where:{compositeFilter:{op:'AND',filters:[
      {fieldFilter:{field:{fieldPath:'session'},op:'EQUAL',value:{stringValue:V_CONFIG.VOTES_SESSION}}},
      {fieldFilter:{field:{fieldPath:'round'},op:'EQUAL',value:{stringValue:String(round)}}}
    ]}},
    limit:300
  }};
}
