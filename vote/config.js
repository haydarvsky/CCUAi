// ═══════════ إعدادات أداة التصويت الحي ═══════════
// نفس مشروع Firebase - مجموعة answers المفتوحة بالقواعد.
// وثيقة حالة الجولة تُكتب بمعرّف ثابت STATE_DOC داخل نفس المجموعة.
// «الأطقم» PRESETS: نفس الأداة بسؤال وخيارات مختلفة حسب اليوم.
// الافتراضي = اليوم الثاني (هوية الصوت). أضف ?p=launch للروابط = اليوم الرابع (جاهزية الانطلاق).
const V_PRESETS = {
  voice: {
    STATE_DOC: "ccuai-d2-state",
    VOTES_SESSION: "ccuai-d2-votes",
    Q: "هل هذا المحتوى يعكس فعلاً هوية الصوت المكتوبة؟",
    OPTS: [
      {c:"yes", label:"نعم بوضوح ✅"},
      {c:"mid", label:"جزئياً 🤔"},
      {c:"no",  label:"لا ❌"}
    ]
  },
  launch: {
    STATE_DOC: "ccuai-d4-state",
    VOTES_SESSION: "ccuai-d4-votes",
    Q: "هل هذا المشروع جاهز للانطلاق؟",
    OPTS: [
      {c:"yes", label:"جاهز ينطلق 🚀"},
      {c:"mid", label:"يحتاج لمسات 🔧"},
      {c:"no",  label:"يحتاج عملاً أعمق 🛠"}
    ]
  }
};
const V_PRESET_KEY = new URLSearchParams(location.search).get('p') === 'launch' ? 'launch' : 'voice';
const V_P = V_PRESETS[V_PRESET_KEY];
const V_CONFIG = {
  PROJECT_ID: "vak-quiz-96d5f",
  API_KEY: "AIzaSyADogtO8s6kDuTrs1Tup6J4acY47T5DmdM",
  COLLECTION: "answers",
  STATE_DOC: V_P.STATE_DOC,
  VOTES_SESSION: V_P.VOTES_SESSION
};
const V_BASE = `https://firestore.googleapis.com/v1/projects/${V_CONFIG.PROJECT_ID}/databases/(default)/documents`;
const V_STATE_URL = `${V_BASE}/${V_CONFIG.COLLECTION}/${V_CONFIG.STATE_DOC}?key=${V_CONFIG.API_KEY}`;
const V_RQ_URL = `${V_BASE}:runQuery?key=${V_CONFIG.API_KEY}`;
const V_POST_URL = `${V_BASE}/${V_CONFIG.COLLECTION}?key=${V_CONFIG.API_KEY}`;
// يحافظ على ?p عند التنقل بين صفحات الأداة
const V_QS = V_PRESET_KEY === 'launch' ? '?p=launch' : '';
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
