// import React, { useState, useEffect } from 'react';
// import { GraduationCap, Sparkles } from 'lucide-react';
// import { SubjectForm } from './components/SubjectForm';
// import { FileUpload } from './components/FileUpload';
// import { CGPAResult } from './components/CGPAResult';
// import { Subject } from './types';
// import { calculateCGPA } from './utils/cgpaCalculator';

// function App() {
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [studentName, setStudentName] = useState('');
//   const [cgpaResult, setCgpaResult] = useState(calculateCGPA([]));

//   useEffect(() => {
//     setCgpaResult(calculateCGPA(subjects));
//   }, [subjects]);

//   const handleDataExtracted = (extractedSubjects: Subject[]) => {
//     setSubjects(extractedSubjects);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-transparent to-blue-800/20"></div>
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg">
//               <GraduationCap className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
//               CGPA Calculator
//             </h1>
//             <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
//           </div>
//           <p className="text-xl text-white/80 max-w-2xl mx-auto">
//             Calculate your CGPA with precision. Upload your mark sheet or enter details manually for instant results.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Left Column */}
//           <div className="space-y-8">
//             {/* Student Name Input */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
//               <div className="flex items-center gap-3 mb-4">
//                 <GraduationCap className="w-6 h-6 text-green-300" />
//                 <h2 className="text-2xl font-bold text-white">Student Information</h2>
//               </div>
//               <input
//                 type="text"
//                 value={studentName}
//                 onChange={(e) => setStudentName(e.target.value)}
//                 placeholder="Enter your full name"
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
//               />
//             </div>

//             <FileUpload onDataExtracted={handleDataExtracted} />
//             <SubjectForm subjects={subjects} onSubjectsChange={setSubjects} />
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8">
//             <CGPAResult result={cgpaResult} studentName={studentName} />
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center pt-8 border-t border-white/20">
//           <p className="text-white/60">
//             Designed for students, by students. Calculate your academic performance with confidence.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import { SubjectForm } from './components/SubjectForm';
// import { FileUpload } from './components/FileUpload';
import { CGPAResult } from './components/CGPAResult';
import { Subject } from './types';
import { calculateCGPA } from './utils/cgpaCalculator';

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studentName, setStudentName] = useState('');
  const [cgpaResult, setCgpaResult] = useState<any>(null);
  const [calculated, setCalculated] = useState(false);

  const handleDataExtracted = (extractedSubjects: Subject[]) => {
    setSubjects(extractedSubjects);
    setCalculated(false); // reset
  };

  // ⭐ Save silently to database
  const saveToDatabase = async (name: string, cgpa: number) => {
    try {
      await fetch("https://cgpa-calculator-tdsg.onrender.com/api/cgpa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, cgpa }),
      });

      console.log("✔ Saved silently to DB");
    } catch (error) {
      console.error("❌ Error saving:", error);
    }
  };

  // ⭐ Calculate + Silent Save
  const handleCalculateCGPA = async () => {
    const result = calculateCGPA(subjects);
    setCgpaResult(result);
    setCalculated(true);

    // Save secretly without showing anything on UI
    if (studentName && result.cgpa) {
      await saveToDatabase(studentName, result.cgpa);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">

      <div className="relative z-10 container mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              CGPA Calculator
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* LEFT COLUMN */}
          <div className="space-y-8">

            {/* Student Name Input */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Student Information</h2>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
              />
            </div>

            {/* File Upload */}
            {/* <FileUpload onDataExtracted={handleDataExtracted} /> */}

            {/* Subject Form */}
            <SubjectForm subjects={subjects} onSubjectsChange={setSubjects} />

            {/* ⭐ Calculate Button */}
            <button
              onClick={handleCalculateCGPA}
              disabled={subjects.length === 0}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-600 transition-all"
            >
              Calculate CGPA
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {calculated && cgpaResult && (
              <CGPAResult result={cgpaResult} studentName={studentName} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

