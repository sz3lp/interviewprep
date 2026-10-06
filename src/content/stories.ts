import type { StarStory } from './types'

/**
 * Life-story bank for Distill prompts (feeds the 3 EF&R screening answers).
 * Edit here, then open Distill → Rebuild / practice on Scroll.
 */
export const lifeStoryAnswers: Record<string, string> = {
  'd-spark': `Firefighters have been quietly shaping my life since I was a kid. I grew up next door to a local fire captain and admired him. Later, working at Starbucks, a coworker who was a firefighter told me my personality and drive fit the service. When I ran my contracting business, I installed gutters for a firefighter who brought me inside for lasagna and talked with me about the job. I also saw crews respond to my family during raw, terrible moments—including my brother's suicide attempt on Thanksgiving. I always respected the badge, but the moment it actually clicked was medical, and it was personal.

My dad has Multiple Sclerosis. I've helped him off the floor more times than I can count. But the day he fell and broke his femur, I was completely helpless. I couldn't fix it. I couldn't relieve his pain. The crew walked in, did a rapid trauma assessment, and identified the fracture within seconds. Watching their calm competence in the middle of our worst morning hit me like a ton of bricks. I realized in that room that I never wanted to be the helpless bystander again—I wanted to be the one bringing that standard of care to someone else's family.

After that, the idea stuck and didn't leave. I stopped just thinking about it and started asking real questions. I sought out the firefighters I knew, got into clinical medicine, and stepped into volunteer service. Now that I'm riding shifts, training on the drill ground, and deeper in the process than I've ever been, I know without question this is where I belong.`,

  'd-service-model': `The person who modeled the heart of service for me is my dad. He lives with Multiple Sclerosis, and watching him fight through daily tasks—making a bed, getting into a car, washing dishes—is a lesson in grit. Those movements look trivial to most people, but they are profoundly difficult for him. Yet despite that physical battle, he still makes the effort every single day to bring my mom coffee and cook dinner for our family. He taught me that service isn't something you do when it's easy or convenient; it's a commitment to put other people first, even when it costs you something physically.

On the professional side, my mentor Skip Boylan—a paramedic with Medic One—showed me how service translates to the public. The first time we met for coffee, I walked up, gave the barista a quick "how are you," she didn't answer, I ordered my coffee, and I sat down. Skip immediately asked me: "What's her name, and what's one thing you know about her?" I had nothing. But Skip knew her name, and he knew she'd been working there for nine months. He looked at me and said, "That's how you represent the service." He completely changed how I look at community: real service isn't transactional. It means paying attention, remembering details, and treating people like human beings long before they ever need you on a 911 call.

My dad taught me the grit and selflessness required to serve when it's hard; Skip taught me the intentionality required to represent the department in the community. Those are the standards I hold myself to every time I step onto a shift.`,

  'd-helped-someone': `A pivotal moment for me was with my brother Connor. He carries complex PTSD from severe trauma and abuse in his early life. We were working together, both exhausted and under heavy stress, and tension boiled over. I lost my patience and raised my voice. The moment I did, I saw the physical impact it had on him—he completely shut down, overwhelmed and defensive, bracing for threat. Seeing that look on his face hit me hard. I realized right then that my failure to regulate my own emotions had actively made a vulnerable person feel unsafe. I immediately stopped, owned my frustration, lowered my voice, and stepped back. I apologized for yelling and shifted my entire posture to show him I was on his side. I told him straight: "I am working with you on this, not against you." I listened to where his head was at, gave him the space to breathe, and stayed with him until his guard dropped. Once he saw that I wasn't attacking him, the tension broke, he calmed down, and we were able to finish the job together as partners. That experience completely reshaped how I view people-care. It taught me that when someone is hurting, panicked, or operating out of trauma, you cannot match their volume or impose control. Care requires self-regulation first. In emergency services, patients and families are often living out their worst trauma—my role on that crew is to absorb the chaos, stay calm, and make sure that from the second we step through the door, they know we are there to protect them, not fight them.`,

  'd-people-care-now': `Right now, helping people is built into the rhythm of my daily routine across my training, the station, my job, and my home.

In my EMT class, it means making sure our cohort succeeds together. I build flashcard decks and study guides for my classmates and invite people over to run hands-on practical skills stations so everyone feels confident under testing pressure.

At Snoqualmie Pass Fire, it means station readiness and crew support. When I'm on shift, I pull other volunteers into the bay to inventory the aid cars, memorize compartment layouts, and run mock interview reps for those of us testing for career departments.

On night shifts at Overlake, it means patient advocacy. On the cardiac telemetry and stroke floor, patients are often isolated and terrified. Helping means not rushing out after taking vitals—it means sticking around in the room, explaining what's going on, connecting with them as human beings, and advocating to their nurse for whatever they need.

And at home, it's quiet, practical support. For my dad, whose mobility is limited by MS, it means getting him out of the house to the dog park and driving him to appointments. For my girlfriend working 12-hour hospital shifts, it means making sure dinner is ready when she gets home and breakfast is packed before she walks out the door.

To me, service isn't a speech—it's the daily habit of paying attention to the people around you and doing whatever work needs to be done to take weight off their shoulders.`,

  'd-why-fire-not-other': `I chose fire and EMS over other helping professions because it is the only career that combines the physical craft of the trades, the standard of emergency medicine, and absolute team reliance at the point of impact.

First, the craft: I spent years running an exterior contracting business. I love working with tools, understanding building construction, and solving hands-on mechanical problems with my back and my hands. Firefighting treats public service like an honest trade—whether that's sizing up a building, cutting a roof, forcing a door, or methodically working a rapid trauma assessment.

Second, the team dynamic: In many healthcare roles, work is siloed—you manage your own assignment independently. But on an engine or an aid crew, you operate as a single unit. You live together, train together, maintain the rig together, and when a call drops, your safety and the patient's outcome depend entirely on mutual trust and shared accountability. That level of dependence demands a standard of character and preparation I don't see anywhere else.

Finally, the emergency environment: I work on a hospital floor at Overlake and deeply respect what nurses and doctors do, but they receive people after the scene has been controlled. I want to be out in the district at 2:00 AM—at the foot of the stairs, on the highway, or in the hallway—stepping into an uncontrolled, raw problem, bringing order to the chaos, and providing that initial bridge of safety for someone who has nowhere else to turn.

That blend of mechanical problem-solving, crew accountability, and field medicine is why this is the only profession I am pursuing.`,

  'd-ems-reality': `Honestly, I welcome it. That is the reality of the modern fire service, and it's work I genuinely care about.

Coming from night shifts on the cardiac and stroke floor at Overlake, nothing on an aid call shocks or deters me. I handle every bodily fluid imaginable on a nightly basis—blood, vomit, incontinence—and it doesn't phase me at all. It's part of the human condition when people are sick or injured.

But more importantly, the bulk of medical calls require deep patience and emotional stamina, and that's something I learned long before working in a hospital: Helping my dad navigate Multiple Sclerosis taught me how to protect someone's dignity when their body is failing them. When we get dispatched for an elderly lift assist at 3:00 AM, I don't see an annoyance; I see someone's parent who needs respect and a steady hand. Supporting my brother through complex PTSD taught me how to stay completely calm when someone is agitated, panicked, or having a behavioral crisis.

Fires are what people see on the news, but medical calls are where we actually earn the community's trust every single day. I don't view the aid car as something I have to endure between fires—I view it as the core mission of the job, and I'm ready to own it.`,

  'd-fitness': `My physical preparation is structured around the functional demands of the fire ground and the physical resilience needed for career shift work:

Strength Training (3 Days a Week): I focus heavily on compound lifts—squats, deadlifts, presses, and pull-ups. I train specifically for posterior chain strength, core bracing, and grip endurance, because that translates directly to hoisting ladders, managing charged hoselines, and executing patient carries without risking career-ending back injuries.

Cardiovascular Conditioning (3 Days a Week): I run three 5Ks a week to maintain a strong aerobic engine. A solid aerobic base is what allows you to sustain a low resting heart rate, recover quickly between working evolutions, and conserve air on a bottle. I also integrate loaded rucking and interval work so my legs and lungs are adapted to working hard under the weight of turnouts and SCBA.

Recovery & Nutrition: Working night shifts at the hospital taught me that training hard means nothing if you don't recover. I keep my nutrition dialed in on high-protein whole foods, and I treat sleep discipline as a non-negotiable duty—using deliberate sleep hygiene and targeted melatonin supplementation to ensure my body repairs between night shifts, EMT classes, and station drills.

I passed the CPAT, but for me, fitness isn't just about passing a test once—it's about showing up to the academy physically durable and building a baseline that keeps me uninjured for a 30-year career.`,

  'd-certs': `My training and certifications have been deliberately structured around clinical emergency care, fire ground readiness, and long-term service:

On the Medical Side: I hold a current AHA BLS Healthcare Provider CPR certification and earned my CNA credential through Lake Washington Institute of Technology, which I actively put to work on night shifts on the cardiac telemetry and stroke floor at Overlake. To lock in my pre-hospital foundation, I am currently enrolled in the King County EMS EMT training course in Bellevue, ensuring my practical skills and protocol understanding align directly with regional King County standards.

On the Fire Operations Side: I am an active volunteer firefighter with Snoqualmie Pass Fire and Rescue, training weekly on SCBA checks, apparatus layout, hoseline deployments, and fire ground safety. That's reinforced by thousands of hours of real-world trade experience running an exterior contracting business, where I mastered ladder operations, power tools, and job-site risk management.

Testing & Benchmarks: I hold a current CPAT certification and have completed both the PST and NTN written testing batteries.

Higher Education: Looking ahead to long-term operational and leadership growth, I am enrolled in an accelerated Bachelor of Science program in Healthcare Administration through Western Governors University.

Every class, shift, and certification has been pursued with one goal in mind: ensuring that when I earn a seat in Eastside Fire's recruit academy, I show up prepared, competent, and ready to contribute to the crew immediately.`,

  'd-exposure': `Yes, across my station visits, volunteering with Snoqualmie Pass Fire, and local community service, a few clear lessons have stuck with me:

First, the standard of station readiness: During my station visits and time riding shifts at Snoqualmie Pass, what stood out immediately wasn't the calls—it was the discipline in the bay. The very first thing the crew does before anything else is rig checks, SCBA inspections, inventorying medical bags, and testing tools. Equipment readiness is treated as a matter of life and death, not an afterthought.

Second, the humility of crew culture: Station life is built on mutual respect and shared ownership. The senior firefighters I watched didn't sit back; they were the first ones grabbing a mop, wiping down the kitchen, or staging equipment. There's no room for ego. When the tones drop, that relaxed camaraderie flips instantly into quiet, calculated professional execution.

Third, quiet public service: Outside the firehouse, I volunteer locally doing manual maintenance, like hauling wheelbarrows and laying mulch at the Marymoor Park off-leash area. It's dirty, physical work with zero spotlight, but it directly protects and improves a shared space for the community.

What connected all of these experiences is simple: whether you are inspecting an apparatus, running a medical call, cleaning the firehouse kitchen, or working on community trails, real service is about taking pride in the unglamorous work and taking ownership of the environment around you.`,

  'd-efr-research': `I've done my homework on Eastside Fire & Rescue, and what stands out to me is your unique regional partnership model, your operational diversity, and your proactive approach to community care.

First, the Partnership Scope: EF&R isn't a typical single-city agency. By uniting Issaquah, Sammamish, North Bend, and Districts 10 and 38 under an interlocal model, you protect nearly 190 square miles and over 140,000 people with high fiscal efficiency and regional collaboration.

Second, the Operational Diversity: Covering this district demands versatility that few departments require. In a single shift, a crew can respond to a high-density suburban medical call in Sammamish, a multi-vehicle extrication on I-90, a low-angle technical rescue on Tiger Mountain, or a wildfire threat at the wildland-urban interface. Living on the Eastside and volunteering at Snoqualmie Pass, that dynamic environment is exactly where I want to train and build my career.

Third, Proactive Medical Care: Coming from the cardiac and stroke floor at Overlake, I deeply respect that EF&R doesn't just treat the aid car as a checkbox. Your commitment to Mobile Integrated Health and addressing root causes—like fall prevention and community paramedicine—shows a department dedicated to long-term patient dignity.

Finally, the URDS Values: Unity, Respect, Determination, and Safety aren't just buzzwords on your website—they match how I live my life, from supporting my family through chronic illness to working with crew members on the drill ground. I don't just want to be a firefighter anywhere; I want to invest my 30-year career into the agency protecting the Eastside communities I call home.`,

  'd-hard-training': `I passed the CPAT and keep training for academy durability—compound strength three days a week, 5Ks and loaded ruck/interval work three days a week—while stacking night shifts at Overlake, EMT class, and Snoqualmie Pass drills. The hard part isn't one workout; it's recovering between night shifts and still showing up ready. I treat sleep hygiene and high-protein nutrition as duty, not optional, so I can stay uninjured and useful for a long career.`,

  'd-stress-prep': `Working night shifts on cardiac telemetry taught me recovery is an operational skill. I protect sleep with deliberate hygiene and melatonin when circadian rhythm flips, keep nutrition high-protein and simple, and debrief hard days instead of carrying them alone. On calls and at home, I lower my own volume first—especially supporting my dad with MS and my brother through PTSD—so I can be steady for other people.`,

  'd-trait-labels': `Steady, self-directed, and intentional.`,

  'd-reliability': `When I operated my exterior contracting business, an elderly homeowner called me late on a Friday evening during a torrential rainstorm. A gutter section we had worked on had an unexpected backup, water was overflowing near her foundation, and she was furious and panicked. My crew had clocked out, I was exhausted after a 12-hour day, and standard business practice would have been to schedule a service visit for Monday morning. Instead, I drove out to her home in the dark with my ladder and headlamp. I got up into the downspout in the pouring rain, cleared the structural obstruction, and made sure the runoff was draining safely away from her basement. Afterward, I stood on her porch, soaked, walked her through the issue, and apologized for the stress it caused. Her anger completely dissolved into relief. That moment reinforced a principle I live by: true reliability isn't about being dependable when it's convenient or on the clock—it's about showing up in the rain, taking absolute ownership, and solving the problem when people feel vulnerable.`,

  'd-calm': `During a night shift on the cardiac telemetry floor, I walked into a patient's room for routine vitals and immediately recognized acute neurological and hemodynamic deterioration. The patient was suddenly slurring his speech, had distinct facial droop, and his telemetry monitor showed his heart rate spiking with erratic rhythm changes. In that moment, panic does nothing. I prioritized three things immediately: patient safety, rapid notification, and objective baseline data. I kept my voice calm to keep the patient from spiking further panic, positioned him safely to protect his airway, and hit the staff assist call while immediately pulling a fresh set of vitals and blood glucose. When the primary nurse and rapid response team stepped into the room seconds later, I didn't give a frantic explanation—I gave a concise, objective report: exact onset time, current vitals, blood sugar, and specific neurological changes observed. Because we stayed calm and organized, the team initiated the stroke protocol and interventions without losing critical minutes. It reinforced that composure isn't about ignoring the adrenaline; it's about lowering your heart rate, falling back on your fundamentals, and prioritizing clear communication so the team can work smoothly.`,

  'd-team': `When my brother Connor and I were running high-reach exterior contracting jobs, we were on a steep two-story site running behind schedule. We were staging a 32-foot extension ladder on an uneven grade without adequate tie-offs or a stable footer setup. My ego wanted to push through—I wanted to hit our production numbers, stay on schedule, and prove we could get it done without wasting time resetting the entire rig. Connor voiced concern about the stability of the base. My initial instinct was to get defensive and dismiss it because I was focused on the deadline. But I immediately caught myself. I realized that my pride and rush to finish were putting my partner at physical risk. I killed the ego right there, stopped the job, and said, "You're right—safety comes before the clock." We broke down the setup, leveled the base properly, rigged anchor tie-offs, and climbed only when both of us were completely secure. That experience taught me that in dangerous environments—and especially in station life—ego is a liability. True unity means caring more about the safety and trust of the person next to you than proving you have the authority or the quickest way out.`,

  'd-integrity': `In contracting and on the hospital floor, trust is the job. When something is my fault—a callback, a missed detail, a bad setup—I own it out loud, fix it in person, and don't hide behind the crew or the weather. The Friday-night gutter callback in the rain is the same integrity standard I'll bring to the firehouse: protect the public and the badge even when it's inconvenient.`,

  'd-value-hook': `I connect most with Determination and Safety. Determination is my dad fighting through MS to still serve our family every day, and me stacking night shifts, EMT class, and drill nights without quitting when it's hard. Safety is calling the stop on an unsafe ladder setup with Connor—ego and the clock lose to the person next to me. On an EF&R crew those values mean I show up prepared, I speak up early on hazards, and I finish the unglamorous work without needing credit.`,
}

/** Polished ~90s screening drafts distilled from the life-story bank. */
export const screeningDrafts = {
  why: `I want to be a firefighter because the idea stopped being abstract the day my dad fell and broke his femur. He lives with MS, and I've helped him off the floor many times—but that morning I was helpless. The crew walked in, did a rapid trauma assessment, and found the fracture in seconds. Watching that calm competence, I decided I never wanted to be the bystander again.

Firefighters had already been shaping my life—growing up next door to a captain, coworkers and customers in the service, and crews showing up for my family in the worst moments. After dad's call I stopped just thinking about it and got into clinical medicine, volunteer fire, and the process for real.

I chose fire and EMS over other helping careers because it blends the physical craft of the trades I already live, emergency medicine at the point of impact, and true crew reliance. I welcome that most calls are medical—night shifts on Overlake's cardiac and stroke floor, and supporting my dad and brother, taught me patience, dignity, and staying calm when people are scared. That's the work I want to own on a crew.`,

  prep: `I've prepared deliberately across fitness, credentials, exposure, and agency research.

Physically I train for the fire ground: compound strength three days a week for posterior chain, core, and grip; three 5Ks plus ruck and interval work for aerobic base under load. I passed the CPAT, and I treat sleep and high-protein nutrition as non-negotiable around night shifts so I stay durable for academy and a long career.

Clinically I'm a CNA working night shifts on Overlake's cardiac telemetry and stroke floor, AHA BLS current, and enrolled in King County EMS EMT training in Bellevue so my protocols match regional standards. Operationally I'm an active volunteer at Snoqualmie Pass Fire—SCBA, apparatus, hose, ladders—and I bring years of trades ladder and tool work from running an exterior contracting business. I've completed PST and NTN testing and I'm in a Healthcare Administration bachelor's at WGU.

What stuck from station life and volunteering is morning readiness before coffee, low-ego chores, and quiet community work like mulching at Marymoor. For EF&R specifically I've studied the interlocal partner model across Issaquah, Sammamish, North Bend, and Districts 10 and 38; WUI and I-90 operational diversity; Mobile Integrated Health; and Unity, Respect, Determination, and Safety. I'm preparing to show up ready on day one of recruit academy.`,

  traits: `If you asked my family, Overlake coworkers, and the crews I drill with at Snoqualmie Pass, they'd point to three traits: steady, self-directed, and intentional.

Steady: I don't get rattled easily. Night shifts on cardiac telemetry and helping my dad through MS taught me to regulate when things get loud. On an acute neuro change at bedside I protected the airway, called for help, pulled vitals and glucose, and gave a calm objective handoff so the team could start stroke protocol without losing minutes.

Self-directed: Running an exterior trades business taught me ownership. I don't wait to be assigned the mop, the compartment check, or the study deck. Late on a Friday in a rainstorm I climbed a ladder in the dark for an elderly homeowner with a gutter backup instead of pushing her to Monday—reliability when it's inconvenient.

Intentional: I take people seriously—Skip Boylan taught me to know the barista's name; I build EMT study tools for my cohort; I linger with scared patients instead of chart-and-bolt.

And for Unity and Safety: when Connor flagged an unsafe 32-foot ladder setup on uneven ground, I killed my ego and the schedule, reset the base and tie-offs, and climbed only when we were both secure. On a crew those traits mean low ego, calm under stress, and someone who protects trust and the person next to them.`,
} as const

/** STAR / spoken bank for oral boards — filled from real life stories. */
export const stories: StarStory[] = [
  {
    id: 'story-teamwork',
    title: 'Safety over ego — ladder setup with Connor',
    competencies: ['teamwork', 'leadership'],
    efrValues: ['Unity', 'Safety'],
    bfdLookFors: ['Teamwork and Cooperation', 'Results'],
    situation:
      'High-reach exterior job with brother Connor; steep two-story site; behind schedule; 32-foot ladder on uneven grade without adequate tie-offs.',
    task: 'Keep production moving without putting my partner at risk.',
    action:
      'Caught my urge to dismiss his concern, stopped the job, reset base and anchors, climbed only when both secure.',
    result: 'Safe climb, trust protected, job finished without injury or ego battle.',
    lesson:
      'Ego is a liability. Unity means the person next to you beats the clock.',
    spokenVersion: lifeStoryAnswers['d-team'],
    placeholder: false,
  },
  {
    id: 'story-conflict',
    title: 'De-escalating with Connor under stress',
    competencies: ['conflict', 'customerService'],
    efrValues: ['Respect', 'Unity'],
    bfdLookFors: ['Teamwork and Cooperation', 'Communication'],
    situation:
      'Working with brother Connor (complex PTSD); both exhausted; I raised my voice and he shut down.',
    task: 'Repair trust and finish the work without making him feel unsafe.',
    action:
      'Owned it, lowered volume, apologized, shifted posture, stayed with him until his guard dropped.',
    result: 'Tension broke; finished as partners; reshaped how I view trauma-informed people-care.',
    lesson:
      'Self-regulation first. On a call, absorb chaos—don\'t match volume.',
    spokenVersion: lifeStoryAnswers['d-helped-someone'],
    placeholder: false,
  },
  {
    id: 'story-integrity',
    title: 'Ownership when the callback is on me',
    competencies: ['integrity'],
    efrValues: ['Determination', 'Respect'],
    bfdLookFors: ['Ethical accountability', 'Standards'],
    situation:
      'Friday night rainstorm; elderly homeowner; gutter backup near foundation; crew gone; I was exhausted.',
    task: 'Protect her home and trust—even when Monday would have been easier.',
    action:
      'Drove out with ladder and headlamp, cleared obstruction in the rain, explained and apologized on her porch.',
    result: 'Anger turned to relief; principle locked: reliability is inconvenient ownership.',
    lesson: 'Trust is the job. Show up in the rain.',
    spokenVersion: lifeStoryAnswers['d-reliability'],
    placeholder: false,
  },
  {
    id: 'story-customer',
    title: 'Dignity on the floor — dad, patients, community',
    competencies: ['customerService', 'diversity'],
    efrValues: ['Respect'],
    bfdLookFors: ['Desire to Serve', 'Diversity'],
    situation:
      'Daily people-care across Overlake nights, dad with MS, EMT cohort, and station life.',
    task: 'Make helping a habit, not a speech.',
    action:
      'Linger with scared patients, advocate to nurses, build classmate study tools, support dad and girlfriend at home, bay readiness at Snoqualmie Pass.',
    result: 'Service as rhythm—take weight off other people\'s shoulders every day.',
    lesson: 'Helping people means dignity and follow-through.',
    spokenVersion: lifeStoryAnswers['d-people-care-now'],
    placeholder: false,
  },
  {
    id: 'story-stress',
    title: 'Acute bedside deterioration — calm handoff',
    competencies: ['stress'],
    efrValues: ['Safety', 'Determination'],
    bfdLookFors: ['Standards', 'Results'],
    situation:
      'Night shift cardiac telemetry; patient with sudden slurred speech, facial droop, erratic rhythm.',
    task: 'Protect airway, notify team, get objective data without adding panic.',
    action:
      'Calm voice, safe positioning, staff assist, vitals + glucose, concise onset/vitals/neuro report to RRT.',
    result: 'Stroke protocol started without lost minutes; composure as fundamentals under adrenaline.',
    lesson: 'Lower heart rate, prioritize, communicate clearly.',
    spokenVersion: lifeStoryAnswers['d-calm'],
    placeholder: false,
  },
  {
    id: 'story-failure',
    title: 'Raised my voice — owned the impact',
    competencies: ['failure', 'integrity'],
    efrValues: ['Respect', 'Determination'],
    bfdLookFors: ['Grace while learning', 'Results'],
    situation: 'Lost patience with Connor; saw him brace for threat.',
    task: 'Own the harm and repair the relationship immediately.',
    action: 'Stopped, apologized, lowered voice, stayed until he felt safe again.',
    result: 'Finished as partners; permanent lesson on self-regulation.',
    lesson: 'Own mistakes fast. Change the habit.',
    spokenVersion: lifeStoryAnswers['d-helped-someone'],
    placeholder: false,
  },
  {
    id: 'story-diversity',
    title: 'Intentional presence — Skip\'s barista standard',
    competencies: ['diversity', 'customerService'],
    efrValues: ['Respect', 'Unity'],
    bfdLookFors: ['Diversity', 'Cultural understanding'],
    situation: 'Coffee with Medic One mentor Skip Boylan; I treated the barista transactionally.',
    task: 'Learn how the service is represented in public.',
    action: 'Took Skip\'s challenge—know names, details, treat people as humans before the 911 call.',
    result: 'Changed how I show up in community and on the floor.',
    lesson: 'Service isn\'t transactional.',
    spokenVersion: lifeStoryAnswers['d-service-model'],
    placeholder: false,
  },
  {
    id: 'story-grit',
    title: 'Dad\'s MS and fire-ground fitness',
    competencies: ['motivation', 'selfKnowledge'],
    efrValues: ['Determination'],
    bfdLookFors: ['Standards', 'Results'],
    situation:
      'Dad\'s daily fight with MS; my own stack of night shifts, EMT, drills, and CPAT prep.',
    task: 'Build durable capacity—not a one-time pass.',
    action:
      'Functional strength, aerobic + ruck/intervals, sleep and nutrition as duty.',
    result: 'CPAT passed; training aimed at academy durability and a 30-year career.',
    lesson: 'Determination is showing up when it costs you.',
    spokenVersion: `${lifeStoryAnswers['d-fitness']}\n\n${lifeStoryAnswers['d-hard-training']}`,
    placeholder: false,
  },
  {
    id: 'story-leadership',
    title: 'Pulling the bay together — initiative at Station 80',
    competencies: ['leadership', 'teamwork'],
    efrValues: ['Unity', 'Determination'],
    bfdLookFors: ['Results', 'Be a resource'],
    situation: 'Volunteer shifts at Snoqualmie Pass; others testing for career departments.',
    task: 'Raise readiness without waiting to be asked.',
    action:
      'Pull volunteers into bay for aid-car inventory, compartment layouts, mock interview reps; build EMT study decks for cohort.',
    result: 'Shared prep culture; low-ego contribution from my seat.',
    lesson: 'Lead from your seat—initiative without undermining the officer.',
    spokenVersion: lifeStoryAnswers['d-people-care-now'],
    placeholder: false,
  },
  {
    id: 'story-why-ff',
    title: 'Why firefighter — dad\'s femur turning point',
    competencies: ['motivation'],
    efrValues: ['Respect', 'Determination'],
    bfdLookFors: ['Desire to Serve'],
    situation: 'Dad fell and broke his femur; crew\'s calm trauma assessment.',
    task: 'Decide whether to stay a bystander or pursue the standard of care I witnessed.',
    action: 'Entered clinical medicine, volunteer fire, and the hiring process for real.',
    result: 'Clear conviction: this is where I belong.',
    lesson: 'Never again the helpless bystander.',
    spokenVersion: lifeStoryAnswers['d-spark'],
    placeholder: false,
  },
  {
    id: 'bio-tell-me',
    title: 'Tell me about yourself (bio)',
    competencies: ['selfKnowledge', 'motivation'],
    efrValues: ['Determination'],
    bfdLookFors: ['Desire to Serve'],
    situation: 'N/A — spoken bio for screening / speed / oral.',
    task: '60–90s: who you are → path → why fire → why ready now.',
    action:
      'Trades business → Overlake PCT nights → KCEMS EMT → Snoqualmie Pass volunteer → EF&R process.',
    result: 'Panel sees a deliberate path, not a vague dream.',
    lesson: 'Clarity beats autobiography.',
    spokenVersion: `I'm currently preparing for a career in the fire service while working night shifts as a patient care tech on Overlake's cardiac telemetry and stroke floor, training as a King County EMS EMT student, and volunteering with Snoqualmie Pass Fire & Rescue. Before that I ran an exterior contracting business—ladders, tools, and customer ownership in the rain. Firefighters shaped my life for years, but it locked in when my dad, who has MS, broke his femur and I watched a crew bring calm competence into our worst morning. I never want to be the helpless bystander again. That's why I've stacked clinical work, volunteer drill nights, CPAT and testing, and real research on Eastside Fire & Rescue—and why I'm ready to earn a seat on a crew.`,
    placeholder: false,
  },
]

export const competencyLabels: Record<string, string> = {
  motivation: 'Motivation',
  selfKnowledge: 'Self-knowledge',
  teamwork: 'Teamwork',
  integrity: 'Integrity',
  conflict: 'Conflict',
  stress: 'Stress / composure',
  customerService: 'Customer service',
  diversity: 'Diversity & inclusion',
  leadership: 'Leadership',
  failure: 'Failure / learning',
  deptKnowledge: 'Department knowledge',
  scenario: 'Scenario judgment',
  fit: 'Fit / station life',
}
