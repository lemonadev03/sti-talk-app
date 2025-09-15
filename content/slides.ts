export type SlideKind =
  | "title"
  | "bullets"
  | "code"
  | "image"
  | "finale"
  | "qr"
  | "interactive"
  | "editor"
  | "intro"

export interface Slide {
  id: string
  kind: SlideKind
  title?: string
  subtitle?: string
  bullets?: string[]
  code?: string
  visual?: string
  qrs?: { label: string; image?: string; url?: string }[]
  beforeCode?: string
  afterCode?: string
  starterCode?: string
  images?: string[]
  imageFirst?: boolean
}

export const TALK_TITLE = "From Chaos to Clarity: Functions & Data Structures in Python"

export const slides: Slide[] = [
  {
    id: "1",
    kind: "title",
    title: "Python Functions & Data Structures for Beginners",
  },
  {
    id: "2",
    kind: "bullets",
    title: "Today's Journey",
    bullets: [
      "Task → Challenge → Solution → Why It Was Important",
      "Two core topics: Functions, Data Structures",
      "What to do next to take your skills to the next level",
    ],
  },
  {
    id: "1a",
    kind: "intro",
    title: "About Me",
    bullets: [
      "Interim CTO",
      "Background: Data, AI, and Tech Community Builder",
      "What I love: teaching Python, building with beginners",
    ],
    imageFirst: true,
    images: ["/lesmon-1.png", "/lesmon-2.png"],
  },
  {
    id: "1b",
    kind: "title",
    title: "My Love Story with Python",
  },
  {
    id: "1c",
    kind: "intro",
    title: "Eskwelabs",
    bullets: [
      "Year : 2022",
      "Age : 19",
      "Salary : ₱0",
    ],
    imageFirst: true,
    subtitle: "My Love Story with Python",
    images: ["/eskwe.png"],
  },
  {
    id: "1d",
    kind: "intro",
    title: "Angkas",
    bullets: [
      "Year : 2023",
      "Age : 20",
      "Salary : ₱60,000",
    ],
    imageFirst: true,
    subtitle: "My Love Story with Python",
    images: ["/lesmon-3.png"],
  },
  {
    id: "1e",
    kind: "intro",
    title: "CFL",
    bullets: [
      "Year : 2024-2025",
      "Age : 21",
      "Salary : ₱1xx,xxx",
    ],
    imageFirst: true,
    subtitle: "My Love Story with Python",
    images: ["/professional-headshot.png"],
  },
  {
    id: "funcsintro",
    kind: "title",
    title: "Are you ready to learn?",
  },
  {
    id: "funcs1",
    kind: "title",
    title: "Part 1: Python Functions",
  },
  {
    id: "2s",
    kind: "bullets",
    title: "Story: Why We Need Functions",
    bullets: [
      "You’re helping a student calculate averages for multiple classes.",
      "First try: copy-paste the same math many times.",
      "Let’s see how that gets messy—and how functions help.",
    ],
  },
  {
    id: "2a",
    kind: "editor",
    title: "Task: Average of 3 Tests",
    bullets: [
      "Create Python code that computes a student's average across 3 tests.",
      "Use three variables: `test1`, `test2`, `test3`, then print the average.",
    ],
    starterCode: `# Your task: compute the average of three test scores\n# 1) Set values for test1, test2, and test3\n# 2) Compute the average\n# 3) Print the result\n\n# Example values\nalice_test1 = 85\nalice_test2 = 90\nalice_test3 = 78\n\naverage = (alice_test1 + alice_test2 + alice_test3) / 3\nprint(average)`,
  },
  // Functions Section
  {
    id: "3",
    kind: "bullets",
    title: "Task Challenge: Repeating Yourself",
    bullets: [
      "One long Python script calculating average for several students.",
      "Same logic copied 5 times.",
      "Hard to maintain — one change = many edits and likely mistakes.",
    ],
    code: `# Repeating the same logic for each student\n\n# Alice\nalice_score_1 = 85\nalice_score_2 = 90\nalice_score_3 = 78\nalice_avg = (alice_score_1 + alice_score_2 + alice_score_3) / 3\n\n# Bob\nbob_score_1 = 92\nbob_score_2 = 88\nbob_score_3 = 95\nbob_avg = (bob_score_1 + bob_score_2 + bob_score_3) / 3\n\n# Carla\ncarla_score_1 = 70\ncarla_score_2 = 80\ncarla_score_3 = 90\ncarla_avg = (carla_score_1 + carla_score_2 + carla_score_3) / 3\n\nprint(alice_avg, bob_avg, carla_avg)`,
  },
  {
    id: "4",
    kind: "code",
    title: "The Fix: Write a Function",
    bullets: ["`def` syntax", "Parameters & return values", "One function, reusable anywhere"],
    code: `def calculate_average3(s1, s2, s3):\n    return (s1 + s2 + s3) / 3\n\n# Reuse for multiple students\nalice_avg = calculate_average3(85, 90, 78)\nbob_avg = calculate_average3(92, 88, 95)\ncarla_avg = calculate_average3(70, 80, 90)\n\nprint(alice_avg, bob_avg, carla_avg)`,
  },
  // Core Concepts: Functions
  {
    id: "4a",
    kind: "bullets",
    title: "What is a Function?",
    bullets: [
      "Reusable block of code that performs a specific task",
      "Think of it as a ‘mini-program’ inside your program",
    ],
  },
  {
    id: "4b",
    kind: "editor",
    title: "Defining a Function in Python",
    bullets: [
      "Use the def keyword, followed by the function name and parentheses.",
      "End the first line with a colon : and indent the body.",
    ],
    starterCode: `def greet():\n    print("Hello, world!")`,
  },
  {
    id: "4c",
    kind: "editor",
    title: "Calling a Function",
    bullets: [
      "After defining, call (run) the function by writing its name followed by parentheses.",
    ],
    starterCode: `def greet():\n    print("Hello, world!")\n\n# Call it\ngreet()`,
  },
  {
    id: "4d",
    kind: "editor",
    title: "Parameters (Inputs)",
    bullets: ["Functions can accept data (parameters) to work with."],
    starterCode: `def greet(name):\n    print("Hello,", name)\n\n# Call with an argument\ngreet("Alice")`,
  },
  {
    id: "4e",
    kind: "editor",
    title: "Return Values (Outputs)",
    bullets: ["Functions can send data back using return."],
    starterCode: `def add(a, b):\n    return a + b\n\nresult = add(3, 4)\nprint(result)  # 7`,
  },
  {
    id: "4f",
    kind: "editor",
    title: "Default Parameters",
    bullets: ["Give parameters default values if no argument is provided."],
    starterCode: `def greet(name="friend"):\n    print("Hello,", name)\n\ngreet()           # Hello, friend\ngreet("Charlie")  # Hello, Charlie`,
  },
  {
    id: "4g",
    kind: "editor",
    title: "Keyword Arguments",
    bullets: ["Pass arguments by name for clarity."],
    starterCode: `def power(base, exponent):\n    return base ** exponent\n\nprint(power(exponent=3, base=2))  # 8`,
  },
  {
    id: "4h",
    kind: "code",
    title: "Scope of Variables",
    bullets: ["Variables inside a function are local. x can’t be used outside the function."],
    code: `def demo():\n    x = 5  # local variable\n\ndemo()\n# print(x)  # Uncommenting this line would cause a NameError`,
  },
  {
    id: "4i",
    kind: "editor",
    title: "Docstrings (Function Documentation)",
    bullets: ["Add a description for your function and access it with help()."],
    starterCode: `def greet(name):\n    """Print a friendly greeting to the given name."""\n    print("Hello,", name)\n\nprint(greet.__doc__)`,
  },
  {
    id: "4j",
    kind: "title",
    title: "Good Practices",
  },
  {
    id: "4j-1",
    kind: "code",
    title: "Use clear, descriptive names",
    bullets: ["Bad vs Good"],
    code: `# Bad\n\ndef ca(s):\n    return sum(s) / len(s)\n\navg = ca([85, 90, 78])\n\n# Good\n\ndef calculate_average(scores):\n    return sum(scores) / len(scores)\n\naverage = calculate_average([85, 90, 78])`,
  },
  {
    id: "4j-2",
    kind: "code",
    title: "Keep functions short and focused",
    bullets: ["Single responsibility"],
    code: `# Bad: does too many things\n\ndef process_student(name, scores):\n    avg = sum(scores) / len(scores)\n    report = f"{name}: {avg:.2f}"\n    print(report)\n    with open("report.txt", "a") as f:\n        f.write(report + "\\n")\n\nprocess_student("Alice", [85, 90, 78])\n\n# Good: split into small, focused functions\n\ndef calculate_average(scores):\n    return sum(scores) / len(scores)\n\ndef format_report(name, average):\n    return f"{name}: {average:.2f}"\n\ndef save_report(path, report):\n    with open(path, "a") as f:\n        f.write(report + "\\n")\n\navg = calculate_average([85, 90, 78])\nreport = format_report("Alice", avg)\nprint(report)\nsave_report("report.txt", report)`,
  },
  {
    id: "4j-3",
    kind: "code",
    title: "Avoid global variables",
    bullets: ["Pass state via parameters"],
    code: `# Bad: uses and mutates global state\n\ntotal = 0\n\ndef add_to_total(x):\n    global total\n    total += x\n\nadd_to_total(5)\nadd_to_total(7)\nprint(total)\n\n# Good: pass state explicitly\n\ndef add(total, x):\n    return total + x\n\ncurrent_total = 0\ncurrent_total = add(current_total, 5)\ncurrent_total = add(current_total, 7)\nprint(current_total)`,
  },
  {
    id: "4j-4",
    kind: "code",
    title: "Write docstrings",
    bullets: ["Explain what, inputs, outputs"],
    code: `# Bad: no docstring, unclear parameter name\n\ndef greet(n):\n    print("Hi", n)\n\n# Good: clear name + docstring\n\ndef greet(name):\n    """Print a friendly greeting to the given name."""\n    print(f"Hello, {name}")\n\ngreet("Alice")`,
  },
  {
    id: "4k",
    kind: "bullets",
    title: "Summary",
    bullets: [
      "Define functions with def.",
      "Call them using their name and parentheses.",
      "Pass inputs (parameters) and get outputs (return).",
      "Use default and keyword arguments for flexibility.",
      "Document and keep them simple for clean, reusable code.",
    ],
  },
  {
    id: "5",
    kind: "bullets",
    title: "Challenge Solved: Cleaner, Smarter Code",
    bullets: ["Before: Many, confusing lines → After: Simple, readable code.", "One bug fix updates all uses."],
    code: `# After: cleaner calls using one function\nalice_avg = calculate_average3(85, 90, 78)\nbob_avg   = calculate_average3(92, 88, 95)\ncarla_avg = calculate_average3(70, 80, 90)`,
  },
  {
    id: "5a",
    kind: "interactive",
    title: "Interactive: Simplify with a Function",
    bullets: [
      "Before: repeated math per student.",
      "Click Simplify to refactor into a function.",
    ],
    beforeCode: `# Before: repeating the same calculation\n\n# Alice\nalice_score_1 = 85\nalice_score_2 = 90\nalice_score_3 = 78\nalice_avg = (alice_score_1 + alice_score_2 + alice_score_3) / 3\n\n# Bob\nbob_score_1 = 92\nbob_score_2 = 88\nbob_score_3 = 95\nbob_avg = (bob_score_1 + bob_score_2 + bob_score_3) / 3\n\n# Carla\ncarla_score_1 = 70\ncarla_score_2 = 80\ncarla_score_3 = 90\ncarla_avg = (carla_score_1 + carla_score_2 + carla_score_3) / 3` ,
    afterCode: `# After: \n\ndef calculate_average3(s1, s2, s3):\n    return (s1 + s2 + s3) / 3\n\n# Now just call it\nalice_avg = calculate_average3(85, 90, 78)\nbob_avg   = calculate_average3(92, 88, 95)\ncarla_avg = calculate_average3(70, 80, 90)` ,
  },
  {
    id: "6",
    kind: "bullets",
    title: "Why It Was Important",
    bullets: [
      "Break big problems into tiny steps: Instead of tackling everything at once, you solve one small piece at a time and let each function handle a single job.",
    ],
  },
  {
    id: "funcsintro",
    kind: "title",
    title: "Pop Quiz!",
  },
  {
    id: "ds1",
    kind: "title",
    title: "Part 2: Python Data Structures",
  },
  {
    id: "6a",
    kind: "bullets",
    title: "Story: Organizing Data",
    bullets: [
      "You start tracking many students and their scores.",
      "Loose variables quickly become messy.",
      "We need better containers for data.",
    ],
  },
  {
    id: "6a1",
    kind: "code",
    title: "How Complicated It Gets Without Structures",
    bullets: [
      "Separate variables per student and score",
      "Adding a student touches many lines",
      "Easy to miss values and introduce bugs",
    ],
    code: `# Five students, three scores each — all as separate variables
alice_1=85
alice_2=90
alice_3=78
bob_1=92
bob_2=88
bob_3=95
carlos_1=70
carlos_2=80
carlos_3=90
dana_1=81
dana_2=84
dana_3=79
eli_1=93
eli_2=89
eli_3=94

# Averages (copy-paste math everywhere)
alice_avg=(alice_1+alice_2+alice_3)/3
bob_avg=(bob_1+bob_2+bob_3)/3
carlos_avg=(carlos_1+carlos_2+carlos_3)/3
dana_avg=(dana_1+dana_2+dana_3)/3
eli_avg=(eli_1+eli_2+eli_3)/3

# Class average (manual sum; easy to forget one)
class_avg=(alice_avg+bob_avg+carlos_avg+dana_avg+eli_avg)/5

# Top student (lots of ifs)
top_name="Alice"; top_avg=alice_avg
if bob_avg>top_avg:
    top_name="Bob"; top_avg=bob_avg
if carlos_avg>top_avg:
    top_name="Carlos"; top_avg=carlos_avg
if dana_avg>top_avg:
    top_name="Dana"; top_avg=dana_avg
if eli_avg>top_avg:
    top_name="Eli"; top_avg=eli_avg

print("Class average:", round(class_avg,2))
print("Top:", top_name, round(top_avg,2))`,
  },
  {
    id: "6b",
    kind: "bullets",
    title: "Task: Organize Student Grades",
    bullets: [
      "Create a list of dictionaries for students: name + three scores.",
      "Compute and print the class average using the data structure.",
    ],
  },
  // Data Structures Section
  {
    id: "7",
    kind: "bullets",
    title: "Task Challenge: Scattered Variables",
    bullets: [
      "Variables: `grade1`, `grade2`, `grade3`…",
      "Hard to compute class average or add a new student.",
    ],
    code: `# Scattered and duplicated variables\ngrade1 = 85\ngrade2 = 90\ngrade3 = 78\n\n# Which grade belongs to whom?\nalice = 85\nbob = 90\ncarlos = 88\n\n# Adding someone new means adding more loose variables\ngrade4 = 91\ndave = 91\n\n# Computing an average is manual and error-prone\nclass_avg = (grade1 + grade2 + grade3 + grade4) / 4`,
  },
  {
    "id": "8",
    "kind": "code",
    "title": "The Fix: Lists & Dictionaries",
    "bullets": [
      "Lists: store ordered data and allow duplicates.",
      "Dictionaries: map unique keys (like names) to values (like grades).",
      "You can add, access, and loop through both."
    ],
    "code": "grades = [85, 90, 78]\n\n# Add a new grade to the list\ngrades.append(92)\n\n# Access items by index\nfirst_grade = grades[0]     # 85\nlast_grade  = grades[-1]    # 92\n\n# Compute the class average from the list\nclass_avg = sum(grades) / len(grades)\nprint('Average grade (from list):', class_avg)\n\nstudents = {\n    'Alice': 85,\n    'Bob': 90,\n    'Charlie': 78\n}\n\n# Add a new student\nstudents['Diana'] = 92\n\n# Access a grade by key\nprint(\"Bob's grade:\", students['Bob'])\n\n# Loop through dictionary items\nfor name, grade in students.items():\n    print(f\"{name}: {grade}\")\n\n# Compute the class average from the dictionary\nclass_avg_from_dict = sum(students.values()) / len(students)\nprint('Average grade (from dictionary):', class_avg_from_dict)"
  },
  // Core Concepts: Data Structures
  {
    id: "8a",
    kind: "bullets",
    title: "Introduction to Python Data Structures",
    bullets: [
      "Data structures store and organize data efficiently.",
      "Basic built-in types in Python: Lists, Tuples, Sets, Dictionaries.",
      "Each type has unique properties and use-cases.",
    ],
  },
  {
    id: "8b",
    kind: "editor",
    title: "Lists",
    bullets: [
      "Ordered, mutable (can change), allow duplicates.",
      "Created with square brackets. Common operations shown below.",
      "Good for: ordered collections that may need to change.",
    ],
    starterCode: `# Lists: ordered, mutable, allow duplicates\nfruits = ["apple", "banana", "cherry"]\n\nfruits.append("orange")  # add item\nfruits.remove("banana")  # remove item\nprint(fruits[0])         # access first item\nprint(fruits)`,
  },
  {
    id: "8c",
    kind: "editor",
    title: "Tuples",
    bullets: [
      "Ordered, immutable (cannot change), allow duplicates.",
      "Created with parentheses. Access like lists.",
      "Good for: fixed data, like coordinates or constants.",
    ],
    starterCode: `# Tuples: ordered, immutable\ncoordinates = (10, 20)\nprint(coordinates[0])  # 10`,
  },
  {
    id: "8d",
    kind: "editor",
    title: "Sets",
    bullets: [
      "Unordered, mutable, no duplicates.",
      "Created with curly braces or set(). Supports set operations.",
      "Good for: membership tests, removing duplicates.",
    ],
    starterCode: `# Sets: unordered, no duplicates\nunique_numbers = {1, 2, 3}\nunique_numbers.add(4)\n\na = {1, 2, 3}\nb = {3, 4}\nprint(a & b)  # intersection -> {3}`,
  },
  {
    id: "8e",
    kind: "editor",
    title: "Dictionaries",
    bullets: [
      "Key–value pairs, mutable, keys are unique.",
      "Created with curly braces. Access and modify by key.",
      "Good for: looking up values by a key.",
    ],
    starterCode: `# Dictionaries: key–value pairs\nperson = {"name": "Alice", "age": 25}\n\nprint(person["name"])       # Alice\nperson["age"] = 26          # update value\nperson["city"] = "London"   # add key-value\nprint(person)`,
  },
  {
    id: "8f",
    kind: "title",
    title: "Choosing the Right Data Structure",
  },
  {
    id: "8f-1",
    kind: "code",
    title: "List: ordered, mutable, allows duplicates",
    bullets: [
      "Use when order matters and items may change",
      "Great for stacks/queues and iteration",
    ],
    code: `scores = [3, 1, 3]\n\n# mutate in place\nscores.append(5)\nscores[1] = 2\n\nprint(scores)                 # [3, 2, 3, 5]\nprint(sorted(scores))         # [2, 3, 3, 5]\n\n# membership and iteration\nif 3 in scores:\n    print('found 3')\nfor s in scores:\n    print(s)`,
  },
  {
    id: "8f-2",
    kind: "code",
    title: "Tuple: ordered, immutable",
    bullets: [
      "Use for fixed data that shouldn't change",
      "Safe to share as function returns/keys",
    ],
    code: `dimensions = (1920, 1080)\nwidth, height = dimensions\nprint(width, height)          # 1920 1080\n\n# dimensions[0] = 1280       # TypeError: tuples are immutable\n\n# common pattern: returning multiple values\ndef bounds(data):\n    return (min(data), max(data))\n\nlo, hi = bounds([3, 7, 2, 9])\nprint(lo, hi)`,
  },
  {
    id: "8f-3",
    kind: "code",
    title: "Set: unique items, fast membership",
    bullets: [
      "Use to deduplicate and for set operations",
      "Unordered, no duplicates",
    ],
    code: `nums = [1, 2, 2, 3, 3, 3]\nunique = set(nums)\nprint(unique)                 # {1, 2, 3}\n\n# fast membership checks\nif 2 in unique:\n    print('has 2')\n\n# set operations\na = {'read', 'write'}\nb = {'read', 'execute'}\nprint(a & b)                  # {'read'}\nprint(a | b)                  # {'read', 'write', 'execute'}\nprint(a - b)                  # {'write'}`,
  },
  {
    id: "8f-4",
    kind: "code",
    title: "Dictionary: key → value lookups",
    bullets: [
      "Use for fast lookups by key",
      "Flexible, mutable mapping",
    ],
    code: `user = {'name': 'Alice', 'age': 25}\n\n# add/update\nuser['city'] = 'Cebu'\nuser['age'] = 26\n\n# access\nprint(user.get('email', 'N/A'))\n\n# iterate\nfor key, value in user.items():\n    print(key, value)`,
  },
  {
    id: "8g",
    kind: "bullets",
    title: "Summary",
    bullets: [
      "Lists, Tuples, Sets, and Dictionaries cover most basic needs.",
      "Consider mutability, ordering, and uniqueness when choosing.",
      "Practice with each to understand their behavior and methods.",
    ],
  },
  {
    id: "9",
    kind: "bullets",
    title: "Challenge Solved: Organized & Scalable",
    bullets: ["Add or remove students with one line.", "Easier data manipulation and searching."],
  },
  {
    id: "10",
    kind: "bullets",
    title: "Why It Was Important",
    bullets: [
      "Data organization = less chaos.",
      "Efficient when scaling from 5 to 5,000 records.",
      "Core building block for apps, games, analytics.",
    ],
  },
  // Bringing It Together
  {
    id: "11",
    kind: "finale",
    title: "Grand Finale",
    code: `def class_average(students):\n    return sum(students.values()) / len(students)\n\nprint(class_average({\n    "Alice": 85,\n    "Bob": 90,\n    "Carlos": 88,\n}))`,
    bullets: ["Combine functions and data structures."],
  },
  {
    id: "12",
    kind: "bullets",
    title: "Key Takeaways",
    bullets: [
      "Functions: Break big problems into reusable pieces.",
      "Data Structures: Store and manage data efficiently.",
      "You now have the basic toolkit for any Python project.",
    ],
  },
  {
    id: "pq2",
    kind: "title",
    title: "Pop Quiz!",
  },
  {
    id: "13",
    kind: "bullets",
    title: "My Challenge to You!",
    bullets: [
      "Try building a mini-app (e.g., grade manager or to-do list).",
      "Keep practicing: every big project is just functions + data structures.",
    ],
  },
  // Social QR slide (before last page)
  {
    id: "12a",
    kind: "qr",
    title: "Stay Connected",
    subtitle: "Follow for more Byte-Sized Python",
    qrs: [
      { label: "LinkedIn", url: "https://linkedin.com/in/lesmonandres", image: "/1.png" },
      { label: "TikTok", url: "https://tiktok.com/@lesmonandres", image: "/2.png" },
      { label: "Facebook", url: "https://facebook.com/lesmonandres", image: "/3.png" },
      { label: "Instagram", url: "https://instagram.com/lesmonandres", image: "/4.png" },
    ],
    visual: "QR codes for LinkedIn, TikTok, Facebook, and Instagram",
  },


  {
    id: "12b",
    kind: "title",
    title: "Thank You!",
  },
]
