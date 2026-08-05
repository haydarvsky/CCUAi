// ═══════════ إعدادات أداة كسر الجليد - دورة صناعة المحتوى بالذكاء الاصطناعي ═══════════
// نفس مشروع Firebase لأنظمة التفاعل الحي (TOT وشجرة العائلة).
// المجموعة "answers" مفتوحة بقواعد فايرستور الحالية فتعمل فوراً بلا تعديل.
// الأفضل لاحقاً: أضف بالقواعد { match /ccuai/{doc} { allow read, write: if true; } }
// ثم بدّل COLLECTION إلى "ccuai".
const CC_CONFIG = {
  PROJECT_ID: "vak-quiz-96d5f",
  API_KEY: "AIzaSyADogtO8s6kDuTrs1Tup6J4acY47T5DmdM",
  COLLECTION: "answers",
  SESSION: "ccuai-d1"   // رمز الجلسة - غيّره لكل يوم/دورة جديدة
};
